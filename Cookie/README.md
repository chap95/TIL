# Cookie

쿠키에 전반적인 정의와 쿠키 설정할 때 알아두면 좋은 속성을 정리.

---

### cookie 와 localStorage 의 차이

#### 1. 용량

localStorage - 5MB 이내
cookie - 4KB
<br />

#### 2. 사용목적

localStorage - 웹 워커나 서비스 워커에서 접근이 불가능하다. 오로지 저장용도로만 사용

cookie - Cookie Store API 를 사용하면 HTTP 쿠키를 서비스 워커에 노출이 가능하다. HTTP 통신을 할 때
외부로 전달이 된다.

용도는 여러가지지만 대표적으로 인증과 관련된 통신을 할 때 사용
<br />

#### 3. SameSite 설정

SameSite 는 로그인 토큰을 cookie 에 저장할 때 알아둬야할 속성중 하나다.
