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

<div>
  <input type="checkbox" name="js" />
  <label>JS 공부하기</label>
</div>

<div>
  <input type="checkbox" name="ts" />
  <label>TS 공부하기</label>
</div>

<div>
  <input type="checkbox" name="react" />
  <label>React 공부하기</label>
</div>

<script>
  let inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    input.addEventListener("click", (e) => {
      alert(e.currentTarget.name);
    });
  });
</script>
```

위와 같이 간단한 TODO 가 있다고 가정해보자 각각의 input에 클릭 이벤트리스너를 달아줬다. 이 이벤트는 정확히 `input` 을 클릭해야만 발생합니다.

하지만 우리가 대체적으로 사용하는 웹 서비스는 `input` 뿐 아니라 `label` 영역 더 나아가 `div` 영역 어디를 클릭해도 체크가 되면서 이벤트가 발생해야합니다.