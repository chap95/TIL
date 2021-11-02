# Event

웹 페이지는 이벤트를 propagation(전파) 할 수 있다. 전파의 종류에는
`Bubbling` 과 `capture` 가 있다.

`Bubbling` 은 음료를 잔에 따랐을 때 거품들이 밑에서 부터 위로 올라오는 모습과 유사하게 하위 요소부터 상위 요소까지 전파 됨을 의미한다.

`capture`는 버블링과는 반대로 이벤트가 상위 요소로 부터 하위 요소까지 전파되는 현상을 의미한다.

이 두 가지 현상을 모두 막기위해서 `stopPropagation()` 을 사용하는데 이는 클릭 이벤트가 발생했을 때 캡쳐와 버블링 현상을 모두 막아주는 역할을 한다. `stopPropagation()` 을 사용해서 실제 사용자가 클릭한 요소에서만 이벤트가 발생하여 다른 요소를 신경쓰지 않아도 된다는 장점이 있다.

---

### 왜 propagation 을 할까?

위 설명을 본다면 이벤트를 전파하는 행위자체는 좋지 못한것 처럼 보인다. 하지만 대단하신 개발자 분들이 쓸데없이 만들어 놓지 않았겠지 라는 생각을 하면서 찾아본 결과 `Event Delegation` 이라는 단어를 쉽게 만날 수 있었다.

사실 이벤트 전파(캡처와 버블링)는 `Event Delegation(이벤트 위임)` 을 사용하기 위한 초석이라해도 무방하다.

---

### Event Delegation

이벤트 위임이 어떤 효용성을 가지고 있는지 예시를 통해서 한 번 알아보자

```html
<h1>TODO</h1>

<ul class="todoList">
  <li>
    <input type="checkbox" name="js" />
    <label>JS 공부하기</label>
  </li>

  <li>
    <input type="checkbox" name="ts" />
    <label>TS 공부하기</label>
  </li>

  <li>
    <input type="checkbox" name="react" />
    <label>React 공부하기</label>
  </li>
</ul>
<script>
  let inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    input.addEventListener("click", (e) => {
      console.log(e.currentTarget.name);
    });
  });
</script>
```

위와 같이 간단한 TODO 가 있다고 가정해보자 각각의 input에 클릭 이벤트리스너를 달아줬다. 이 이벤트는 정확히 `input` 을 클릭해야만 한다.

하지만 우리가 대체적으로 사용하는 웹 서비스는 `input` 뿐 아니라 `label` 영역 더 나아가 `div` 영역 어디를 클릭해도 체크가 되면서 이벤트가 발생한다.

가장 쉬운 방법으로는 `label` 과 `input` 을 연결시켜주는 방법이다.

```html
<ul class="todoList">
  <li>
    <input type="checkbox" name="js" id="item1" />
    <label for="item1">JS 공부하기</label>
  </li>

  <li>
    <input type="checkbox" name="ts" id="item2" />
    <label for="item2">TS 공부하기</label>
  </li>

  <li>
    <input type="checkbox" name="react" id="item3" />
    <label for="item3">React 공부하기</label>
  </li>
</ul>
```

위와 같이 html을 수정해주면 input 뿐 아니라 label 을 클릭 했을 때 체크박스가 활성화 된다. 하지만 더 나아가 `li 와 li::marker` 까지 check 가 발생해야 사용성이 좋다고 생각이든다.

추가적으로 `li` 요소가 동적으로 추가가 되어도 이벤트를 `li` 에 각각 추가하는 방식이 아닌 `li` 추가와 상관없이 이벤트 핸들러가 부여되어야 한다.

이는 이벤트 위임으로 해결할 수 있는데 아래와 같은 코드로 해결이 가능하다.

```js
let todoList = document.querySelector(".todoList");

todoList.addEventListener("click", (e) => {
  let clickedTag = e.target.tagName.toLowerCase();
  let clickedCurrentTag = e.currentTarget.tagName.toLowerCase();
  console.log("clickedTag => ", clickedTag);
  console.log("clickedCurrentTag => ", clickedCurrentTag);
  let inputChildNode;
  e.target.childNodes.forEach((node) => {
    if (node.tagName === "INPUT") {
      inputChildNode = node;
    }
  });

  if (inputChildNode) checkInput(inputChildNode);
});

function checkInput(node) {
  console.log("checkInput!");
  node.checked = !node.checked;
}
```

위 코드는 리스트를 감싸고 있는 `div` 에 이벤트를 부여하여 `li`와`li::marker` 까지 check 가능한 영역을 확장하는 코드이다. 추가적으로 `li` 요소가 동적으로 추가된다 하더라도 `div` 에 이벤트를 걸어두어서 `li` 요소 추가와 상관없이 정상적으로 동작할 수 있다.

그런데 위 코드만 봐서는 이게 어디가 이벤트 위임과 관련이 있는지 알 수가 없다.
그래서 로직 중에 console 을 출력하는 부분을 보면
`e.taget` 과 `e.currentTarget` 에 대한 태그 이름을 출력하는데 출력 값을 확인해 보면 이벤트 위임과 연관성이 있다고 생각이 든다.

---

### Event.target VS Event.currentTarget

그렇다면 `target` 과 `currentTarget` 의 차이점을 알아보자
이벤트 위임과 관련된 개념이 없을 때 둘의 차이점에 대해 궁금하지 않았지만 이 둘의 차이는 이벤트 위임과 관련이 있다.

`target`은 이벤트가 전달한 객체에 대한 참조이다. 즉 이벤트가 발생한 영역을 의미하며 `currentTarget` 은 이벤트 핸들러가 부여된 객체에 대한 참조이다. 이는 이벤트 핸들러가 부여된 요소를 의미한다.

실제로 위에서 작성한 코드를 실행시켜 보면 `clickedTag` 에 대한 값은 클릭한 요소에 따라서 변하지만 `clickedCurrentTag` 에 대한 값은 항상 `ul` 로 고정이다.

스크립트 초반부에 `.itemList(ul)` 에 이벤트 핸들러를 부여했으므로 이벤트가 발생한 요소로 부터 `버블링` 현상이 발생해 이벤트가 할당된 요소를 찾는 것이 아닌가 하는 생각이든다.
