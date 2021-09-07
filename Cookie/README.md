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

#### 3. SameSite

SameSite 는 로그인 토큰을 cookie 에 저장할 때 알아둬야할 속성중 하나다.
2020년 4월 구글 크롬80버전부터 Cookie의 SameSite 의 기본값이
'None' -> 'Lax' 로 변경되었다.

지금부터 SameSite 가 어떤 속성이고 어떠한 값이 올 수 있으며 그 값은 무엇을 의미하는지 알아보자.

SameSite 속성에는 다음과 같은 값들이 올 수 있다.

```
- Strict
- Lax
- None
```

- Strict
  이 값은 first-party (같은 사이트)에서 온 쿠키만을 허용하겠다는 키워드이다.

- Lax
  이 값은 SameSite 설정을 건드리지 않으면 default로 들어가는 값이다.
  Lax는 Strict 와 같이 보통의 경우 cross-site 쿠키전송을 허용하지 않는다.
  하지만 몇가지 예외 상황에서는 쿠키를 전송한다.

  ```
  - 최상위 Navigation에 있는 <a> 클릭
  - window.loaction.replace 등으로 인해 자동으로 이루어지는 이동
  - 302 redirect를 이용한 이동
  - HTTP GET 메소드
  ```

- None
  이 값은 크롬 80 이전에는 원래 default 값이었다.
  None은 어떠한 cross-site 쿠키 전송도 허용한다. 하지만 SameSite 가 None 으로 설정이 되면 Secure 이라는 키워드가 붙어야만 쿠키가 전송이 된다.
