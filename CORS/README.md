# CORS

Cross-Origin Resource Sharing 의 약자
resource sharing은 자원공유라는 의미로 해석이 되지만  
cross-origin 이라는 말은 의미가 와닿지 않는다.

---

### origin

우선 origin 이라는 단어의 뜻을 먼저 알아보자.

origin은 URL의 구조를 의미한다.

URL은 아래와 같은 구조를 가지고 있다.

![url URL구성](cors_URL.png)  
여기서 origin은 protocol + host + port 이다.  
F12 를 눌러 console 에 window.origin 을 찍어보면 확인 할 수 있다.  
port 는 생략이 가능하다. 그래서 protocol + host 와 같은 형태가 나온다.

---

### cross-origin

본론으로 돌아와서 origin을 알아봤으니 cross-orign 이라는 말 뜻을 자세히 알아보자.

단어적 의미로 봤을 때 서로 다른 origin 의 자원 공유에 관한 문제라 예측이 된다.
그렇다면 서로 다른 origin 이라 했을 때 어느 범위까지 같아야 같은 origin 취급을 할까?

path와 query, fragment는 origin 판단에 영향을 주지 않는다. protocol ,host, port 이 셋 중 하나만 다르더라고 다른 origin으로 보게 된다.

---

### SOP (same origin policy)

보안을 위해서는 같은 origin 출처의 resource 만 사용는게 좋다. 그렇기 때문에 동일 출처 정책을 사용하는데 이를 사용하면 CSRF 공격을 막아내기 쉽다.

하지만 이론상, 이상적으로 가능한 얘기다. 다른 origin 의 리소스를 사용하지 않고 웹페이지를 구성하는 것은 불가능하다.

---

### ACAO (Access Contril Allow Origin)

SOP 를 통해 보안성을 높이는 점도 중요하다. 하지만 다른 origin의 리소스를 사용하지 못하는 것은 인터넷의 취지와 부합하지 않는다. 구더기 무서워서 된장 못 담그는 격이다.

SOP를 지키지 않고 다른 origin의 리소스를 사용하기 위한 정책이 CORS 라고 할 수 있다.

그러면 CORS는 어떻게 동작할까?
