# 브라우저의 동작방식

---

### Render Engine

랜더링 엔진의 동작 방식에 대해 알아보자.

1. HTML 파싱
   랜더링 엔진은 HTML을 청크 단위로 파싱하여 구성된 트리를 구성한다. 이 트리를 content tree 또는 DOM tree 라고한다.
   이 때 외부의 CSS 파일을 style element 로 파싱한다.
2. Render tree
   브라우저는 HTML 을 파싱하면서 동시에 render tree 를 구성한다. render tree 는 문서의 시각적인 정보가 담겨있는 tree 이다. 이 tree 를 통해 브라우저는 element의 올바른 위치를 파악할 수 있고 rendering 도 올바르게 할 수 있다.
3. layout process
   render tree 구성이 끝나면 render tree를 기반으로 한 layout process 단계다. 여기서 layout 이란 renderer 가 tree 에 추가되었을 때는 위치나 size 를 알 수 없다. 그래서 이 값들을 계산하는 과정을 layout 또는 reflow 이다. layout은 각각의 node 들에게 해당 위치를 알려주는 의미를 가진다.
   render의 기본 좌표는 (0,0) 이며 이 위치는 viewport 이다. 모든 renderer 는 layout 또는 reflow 라는 메소드를 가지고 있는데 이는 레이아웃이 필요한 모든 자식 태그에게 layout 메소드를 호출한다.
