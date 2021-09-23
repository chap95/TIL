# 브라우저의 동작방식

---

### Render Engine

랜더링 엔진의 동작 방식에 대해 알아보자.

1. HTML 파싱 and CSS 파싱
   랜더링 엔진은 HTML을 청크 단위로 파싱하여 구성된 트리를 구성한다. 이 트리를 content tree 또는 DOM tree 라고한다.
   이 때 외부의 CSS 파일을 style element 로 파싱한다. 그리고 CSSOM을 만든다.
2. Render tree
   브라우저는 HTML 을 파싱하면서 동시에 render tree 를 구성한다. render tree 는 문서의 시각적인 정보가 담겨있는 tree 이다. 이 tree 를 통해 브라우저는 element의 올바른 위치를 파악할 수 있고 rendering 도 올바르게 할 수 있다.
3. layout process
   render tree 구성이 끝나면 render tree를 기반으로 한 layout process 단계다. 여기서 layout 이란 renderer 가 tree 에 추가되었을 때는 위치나 size 를 알 수 없다. 그래서 이 값들을 계산하는 과정을 layout 또는 reflow 이다. layout은 각각의 node 들에게 해당 위치를 알려주는 의미를 가진다.
   render의 기본 좌표는 (0,0) 이며 이 위치는 viewport 이다. 모든 renderer 는 layout 또는 reflow 라는 메소드를 가지고 있는데 이는 레이아웃이 필요한 모든 자식 태그에게 layout 메소드를 호출한다.
4. painting
   이 단계에서는 render tree 가 순회되면서 renderer 는 paint() 라는 메소드를 호출하게 된다. paint() 메소드를 통해 화면에 보여지는 내용을 그리게 되며 이 프로세스는 UIBackEndlayer 에서 담당한다.

---

랜더링 엔진은 사용자 경험을 위해 HTML 파싱을 기다리지 않고 render tree 구성 및 레이아웃을 시작한다. 또한 네트워크로 부터 내용을 지속적으로 받으면서 네트워크로 온 내용을 기다리지 않고 오는대로 파싱하고 render 한다.

---

파싱작업을 하는 동안 JavaScript를 만나게 되면은 파싱 작업이 일시정지된다. 그렇기 때문에 많은 양의 JS를 만나게 된다면 랜더링이 늦어질 수 밖에 없다.

위와 같은 문제를 해결하기 위해 script 태그에 defer 또는 async 를 사용한다.

---

JS를 만났을 때 하는 작업은 2가지이다.

- script 다운로드
- scropt 실행

이 두 가지를 기억하고 defer와 async 의 차이를 알아보자

### defer와 async

defer와 async 의 공통점은 HTML을 파싱하면서 script를 다운로드 한다는 점에서 동일하다.

하지만 defer는 HTML 파싱이 다 종료된 후 script를 실행하고 async는 script 다운로드가 끝나면 즉시 실행한다는 차이를 보인다.

script 실행은 파싱과 동시에 작업이 될 수 없기 때문에 두 키워드는 위와 같은 차이를 가지고 있다.

아래 그림을 보면 더 쉽게 이해가 간다.

![defer와 async](./deferAsync.png)

### 사용하는 case

이렇게 보자면 무조건 defer를 사용하는게 랜더링 속도에 유리하다. 하지만 defer와 async는 잘 구분해서 사용해야 성능을 개선할 수 있다.

초기 랜더링과 연관된 script는 async로 설정해두는 것이 좋다.  
랜더 전 실행이 되어야 화면이 제대로 나오는 script 또는 GA 로 유저행동을 트래킹 중이라면 async를 사용해야한다.

초기 랜더에 관여하지 않는 script 라면 defer 를 사용해도 무방하다.
