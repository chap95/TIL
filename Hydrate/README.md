# Hydrate

Hydration 이라고도 불리며 사전적의미로는 수분 공급을 의미한다.
다음 세 가지 상황에서 hydrate 가 어떤 역할을 하는지 알아보자.

- react
- next
- react query

---

##### React

첫 째로 react 에서의 hydrate 에 대해서 알아보겠다.

리액트에는 `ReactDOM.render()` 라는 함수가 존재하는데 이와 같은 역할을 하는 함수가 ` ReactDOM.hydrate(element, container[,callback])` 이 되겠다.

` hydrate()`는 ` render()`와 비슷하지만 조금은 다른 동작을 수행한다.
hydrate는 주로 ReactDOMServer 에 의해 이미 랜더가 진행된 HTML 컨텐츠에 event Listener 를 붙이는 동작을 한다.
