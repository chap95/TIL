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

### ACAO (Access Control Allow Origin)

SOP 를 통해 보안성을 높이는 점도 중요하다. 하지만 다른 origin의 리소스를 사용하지 못하는 것은 인터넷의 취지와 부합하지 않는다. 구더기 무서워서 된장 못 담그는 격이다.

SOP를 지키지 않고 다른 origin의 리소스를 사용하기 위한 정책이 CORS 라고 할 수 있다.

그러면 CORS는 어떻게 동작할까?
CORS 프로토콜은 HTTP 헤더에 포함된 속성으로 신뢰할 수 있는 origin 인지 접근이 허가 됐는지 확인한다.

이 속성을 Access Control Allow Origin 이라고 하며 request 에 대한 respond header에 포함이 된다.

웹 브라우저는 ACAO 와 request를 보낸 웹 사이트의 origin 을 비교하고 그 둘이 일치한다면 접근을 허가한다.

```
GET /data HTTP/1.1
Host: robust-website.com
Origin : https://normal-website.com
```

위는 normal-website.com 도메인을 가진 사이트에서 request 를 보낸예시이다.

GET 방식으로 http1.1을 사용했으며 request의 목적지는 robust-website.com이 된다.

그럼 reponse 를 보자

```
HTTP/1.1 200 OK
...
Access-Control-Allow-Origin: https://normal-website.com

```

다른 부분은 생략했고 ACAO 부분이 request 를 보낸 도메인과 일치한다. 그렇기 때문에 브라우저는 normal-website.com 에서 실행되는 코드가 response 에 접근할 수 있게 허가한다.

ACAO 는 3가지 형태로 정의할 수 있다. 여러 개의 origin 과 null 그리고 와일드카드 (\*) 형태이다.

하지만 브라우저는 여러 개의 origin 을 지원하지 않고 와일드 카드 사용은 제약이 있다.

---

### with credentials (자격증명 or 인증관련)

with credential 은 어떤 의미를 가지고 있을끼?  
바로 자격증명 관련 통신을 의미한다.
기본적인 CORS 요청은 with credential 옵션이 빠져있다.  
하지만 로그인과 같은 자격증명이나 인증과 관련된 통신을 할 때는 with credential 이 필수적이다.

자격증명 통신을 할 때는 http header에 withCredentials 를 true로 넘겨주어야 한다.

그러면 reponse 가 다음과 같이온다.

```
HTTP/1.1 200 OK
...
Access-Control-Allow-Origin: https://normal-website.com
Access-Control-Allow-Credentials: true
```

withCredentials 과 관련된 통신은 Access-Control-Allow-Credentilas 이 reponse에 담겨오게 되는데 이 속성의 값이 true 이면 브라우저는 해당 reponse 를 읽어들인다.

---

### wildcards (와일드 카드 \*)

위에서 와일드 카드에 대한 언급이 있었다.  
origin 관련해서 와일드 카드는 모든 사이트를 의미한다. ACAO는 다른 origin 중 특정 사이트만 access 를 가능하게 만들지만 와일드 카드를 사용하면 모든 사이트에 대한 access를 허용한다.

그렇기 때문에 withCredentials 가 true 일 때는 와일드 카드가 허용되지 않는다.

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Credentials: true
```

위와 같은 reponse 가 오면 브라우저는 reponse를 읽지 않는다. 이유는 간단하다.
withCredentials 가 true 라는 의미는 현재 통신이 보안과 관련된 통신이라는 의미인데 이러한 통신에서 모든 사이트에 대한 access 를 허가한다는 것은 모든 사이트에 cookie 와 같은 보안적인 요소를 허가한다는 의미와 다를게 없기 때문이다.

와일드 카드는 와일드 카드만 쓰여야지 다른 value 와 섞이게 되면 유효하지 않게 되는 점도 기억해야한다.

---

### preflight

CORS 가 허가한 확장된 request의 옵션으로 부터 기존의 리소스를 보호하기 위해서 CORS 스펙에는 pre-flight 기능이 추가됐다.

CORS 요청에도 일정한 규격만 지키면 preflight 를 발생시키지 않는데 일정한 규격, 즉 일반적인 요청은 다음과 같다.

```
- GET, HEAD, POST
- Request Header에 포함가능한 목록
  -> Accept
  -> Accept-Language
  -> Content-Language
  -> Content-Type ---> {
        application/x-www-form-urlencoded
        mutipart/form-data
        text/plain
      }

```

<br />
위와 같은 사항들이 request 에 포함될 수 있고 그 외 나머지가 포함된 경우는
    
<br />

```
method = OPTIONS
```

형태로 preflight 가 전송되고

preflight의 reponse 에는 다음과 같은 속성들이 온다.

```
HTTP/1.1 204 No Content
...
Access-Control-Allow-Origin: https://normal-website.com
Access-Control-Allow-Methods: PUT, POST, OPTIONS
Access-Control-Allow-Headers: Special-Request-Header
Access-Control-Allow-Credentials: true
Access-Control-Max-Age: 240
```

위의 response 는 다음과 같이 해석 될 수 있다.

```
1. cross-origin의 withCredentials = true 요청이 허용된다.
2. 허용되는 method 는 PUT,POST,OPTIONS 이다.
3. 현재 preflight response는 4분 (240초) 동안 캐싱된다.
(4. Special-Request-Header 는 어떤 의미인지 스터디
해서 업데이트 하겠습니다 ㅜ)
```

OPTIONS 요청을 받은 서버는 Response header에 허용할 옵션들을 기술하여 프론트로 전달해주고 브라우저는 Response header 에 기술된 목록을 통해 request가 허용되는지 검사한다.

만약 허용되지 않는다면 405 Method not Allowed 를 발생시키도 원래 요청은 전송하지 않는다.

그렇지 않고 허용되는 요청이면 원래 요청을 전송하게 된다.

---

### 결론

CORS 가 CSRF 공격에 취약하다고 생각하는 것은 오산이라고 한다.
CORS 가 SOP 의 예외지만 위에 나온 설정들만 잘 해준다면 위험하지 않다고 한다.

더군다나 CSRF 공격을 하는 방법은 여러가지며 꼭 CORS 뿐 아니라
HTML form 이나 cross-domain resource를 통해 공격하는 방법이 있다고 한다.
