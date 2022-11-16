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
