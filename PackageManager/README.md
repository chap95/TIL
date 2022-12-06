# NPM vs Yarn vs PNPM

node.js를 사용하면서 npm을 많이 썼다. 처음에는 그저 라이브러리를 설치하는 용도로만 알고 있었는데 `yarn berry`를 사용하게 되면서 패키지 매니저들의 차이점에 대해서 궁금해졌다. 호기심이 생긴김에 `npm` 과 `yarn` 그리고 `pnpm` 의 특징들과 차이점에 대해서 정리해보고자 한다.

---

## npm

위에서 언급한 3가지 패키지 매니저 중에 가장 먼저 등장했다. npm은 세계에서 가장 큰 소프트웨어 registry다. (이는 내가 조사해본 것은 아니고 공식문서에 그냥 써있어서 가져왔다.)

npm은 환경은 3가지로 뚜렷하게 분리가 되어있다.

- 웹사이트 npmjs.com
- npm CLI
- the registry

웹사이트 : 해당 사이트는 주로 npm 패키지를 찾는데 많이 사용한다. 하지만 내가 패키지를 업로드 할 수 있고 organization을 구성해서 패키지를 private 또는 public 하게 사용할 수 있다.

npm CLI : npm 명령어 인터페이스인데 수많은 명령어를 통해서 npm관련 동작을 수행할 수 있다. 대표적인 예시로 `npm install`을 들 수 있다.

the registry : npm이 패키지를 이름과 버전으로 찾기 위해서 registry를 이용한다. registry는 패키지 정보를 찾기위해서 `CommonJS Package Registry` 를 사용한다.

## Yarn

Yarn은 NPM의 몇몇 문제점을 개선해서 등장했는데 Yarn 또한 NPM 과 비슷한 구조를 가지고 있다.

- @yarnpkg/core
- @yarnpkg/cli

이 두 가지의 역할은 적지만 현재 디렉토리에 프로젝트 인스턴스를 hydrate 하고 미리 빌드되 Yarn Plugin을 환경에 주입하는 중요한 역할이 있다.

나는 조금 호기심 더 생겨 Yarn의 코드에 대해서 찾아보았다.
yarn은 `fetchPackage` 라는 함수를 가지고 있는데 이에 대한 설명을 해주는 글을 발견했고 이에 대해 정리해 보았다.

```ts
import fetch from 'node-fetch';

async function fetchPackage(reference) {
  let response = await fetch(reference);

  if (!response.ok) throw new Error(`Couldn't fetch package "${reference}"`);

  return await response.buffer();
}
```
위와 같은 형태는 `fetchPackage` 의 기본형태이다. 하지만 위 함수는 `reference` 의 URL이 정확해야지만 package를 찾을 수 있다. 그렇다면 패키지 이름과 버전 정보만으로 URL을 얻을 수는 없을까?

이 구현에서는 `x.x.x` 와 같은 형태를 찾아주는 `semver` 라이브러리를 사용한다. 

```ts
import semver from 'semver';

async function fetchPackage({ name, reference }) {
  if (semver.valid(reference))
    return await fetchPackage({
      name,
      reference: `https://registry.yarnpkg.com/${name}/-/${name}-${reference}.tgz`,
    });

  let response = await fetch(reference);

  if (!response.ok) throw new Error(`Couldn't fetch package "${reference}"`);

  return await response.buffer();
}
```

첫 번쨰 코드와 차이점은 함수의 인자가 변경되었단 점이다. `reference` 라는 변수에 URL을 전달해주던 첫 번째 방식과 달리 package의 이름과 버전을 넘겨줌으로써 package를 찾을 수 있다.

이 다음에는 `file-system`에 기반해서 패키지를 resolution 하는 로직을 추가해야한다. 외부에서 찾아 올 수 있지만 이미 다운로드 받아서 캐싱이 되었거나 이미 깔려 있는 package가 있을 수 있다.

이 떄는 `fs` 를 이용한다. 파일의 URL이 `/`,`./`,`../` 로 시작하는지 확인하는 방법으로 로직을 전개한다.
```ts
import semver from 'semver';
import fs from 'fs-extra';

async function fetchPackage({ name, reference }) {
  if ([`/`, `./`, `../`].some(prefix => reference.startsWith(prefix)))
    return await fs.readFile(reference);

  if (semver.valid(reference))
    return await fetchPackage({
      name,
      reference: `https://registry.yarnpkg.com/${name}/-/${name}-${reference}.tgz`,
    });

  let response = await fetch(reference);

  if (!response.ok) throw new Error(`Couldn't fetch package "${reference}"`);

  return await response.buffer();
}
```

위와 같은 형태로 구성이 가능하다. 그러면 `fetchPackage` 함수의 동작을 3단계로 나눠서 표현해보자

1. 패키지의 references가 file-system에 있는지 확인한다.
 `/`,`./`,`../` 문자열로 확인

2. `semver` 를 이용해서 `refernce` 인자가 package의 URL 인지 확인한다. 

3. 그러면 node의 fetch 함수가 동작하면서 package를 project 내부로 다운로드를 받는다.

이제 패키지 이름과 버전으로 URL을 찾을 수 있는 함수를 만들었다. 그런데 이 함수에는 한 가지 단점이 존재한다. 그건 바로 범위 형태로 표현된 버전에 대해서는 URL 정보를 찾을 수 없다는거다. 

그러면 범위 형태의 버전정보로도 URL을 찾을 수 있게 변경해보자
이 때에도 `semver` 라이브러리를 사용한다.

```ts
import semver from 'semver';

async function getPinnedReference({ name, reference }) {
  if (semver.validRange(reference) && !semver.valid(reference)) {
    let response = await fetch(`https://registry.yarnpkg.com/${name}`);
    let info = await response.json();

    let versions = Object.keys(info.versions);
    let maxSatisfying = semver.maxSatisfying(versions, reference);

    if (maxSatisfying === null)
      throw new Error(
        `Couldn't find a version matching "${reference}" for package "${name}"`
      );

    reference = maxSatisfying;
  }

  return { name, reference };
}
```

`semver` 라이브러리를 통해서 버전 범위가 알맞은지 확인하고 버전자체가 valid 하지 않다면 fetch를 통해서 package를 받아 온 후에 범위 내에서 가장 최신버전을 받아오게 된다. 그리고 `return` 문을 보면 형태가 `fetchPackage`의 파라미터와 동일하기 때문에 위에서 만들었던 함수인 `fetchPackage` 에 전달하면 package가 fetch 된다.

이제 범위로 표기된 `package` 도 문제 없이 설치할 수 있다. 하지만 이 `package` 들도 다른 `package` 로 구성되어 있다는 사실을 잊어서는 안된다. 다행히도 `package` 의 `package` 목록들은 `package.json` 에 표시가 잘 되어있다. 위에서 언급했듯이 모든 `package` 는 `package.json` 파일을 가지고 있기에 해당 `package` 를 fetch 하게 되면 해당 `package` 에 대한 `package.json`을 받을 수 있다. 이를 기반으로 `package`의 `package` 즉 `dependencies` 를 fetch 해보자

```ts
import { readPackageJsonFromArchive } from './utilities';

async function getPackageDependencies({ name, reference }) {
  let packageBuffer = await fetchPackage({ name, reference });
  // 위에서 만들었던 fetchPackage 함수를 이용해서 해당 package를 받아온다.
  let packageJson = JSON.parse(await readPackageJsonFromArchive(packageBuffer));
  // readPackageJsonFromArchive 함수를 이용해서 패키지 내부에 있는 package.json 파일을 읽고 파싱한다.

  
  let dependencies = packageJson.dependencies || {};
  // dependencies 목록을 구성

  return Object.keys(dependencies).map(name => {
    return { name, reference: dependencies[name] };
  });
  // 배열 형태로 dependencies의 이름과 버전 또는 URL을 내보낸다.
  // 이를 다시 fetchPackage 함수를 이용해서 받아올 수 있다.
}
```
