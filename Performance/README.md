# Performance

성능개선 전 알아둬야 할 개념 정리 및 성능 개선 과정을 담아보았다.

---

#### LCP(Largest Contentful Paint)

엘리먼트들 중 가장크고 의미있는 엘리먼트가 얼마나 빠르게 랜더링되느냐에 대한 지표다. 대부분의 페이지에서는 가장 큰 이미지가 되지 않을까 생각한다.

LCP는 hero element 가 얼마나 빠르게 랜더링 되느냐라는 의미와 같다 생각한다. 페이지 전체가 랜더링이 늦더라도 hero element 만이라도 빠르게 랜더링 되면 사용자들의 심리상 웹페이지 반응 지나치게 느리지 않다고 생각한다.

하지만 이 LCP 는 개선하기 힘들다. 그 이유는 구글 라이트하우스에서 페이지가 로딩 됨에 따라 가장 큰 엘리먼트를 지속적으로 변경하기 때문이다.

측정 기준

```
GOOD : less than 2.5s
NEEDS IMPROVEMENT : 2.5s ~ 4.0s
POOR: more than 4.0s
```

과거에는 엘리먼트의 로딩 속도를 측정하기 위해서 FMP (First Meanungful Paint) 나 SI (Speed Index) 를 지표로 삼았다.
하지만 이 두가지 요소는 설명이 어렵고 가끔 페이지에 주요 로드를 잘 못 식별하는 경우가 있다.

그렇기 때문에 보다 명확하고 쉬운 요소가 필요했다. 엘리먼트 로드 시기를 결정 짓는 시기를 W3C 와 구글에서는 LCP 를 엘리먼트의 로드 척도로 정하게 되었다.

개선방법

```
LCP 는 4가지 요소에 영향을 받는다.
- 느린 서버 response
- 랜더 blocking
- 리소스 로드 시간
- CSR(Client Side Rendering)

개선 방법은 다음과 같다
- PRPL 패턴 사용하기
  (Pre-load / Render the initial route as soon as possible / Pre-cache / Lazyload)
- Critical Rendering 경로 최적화
- CSS 최적화
- JS 최적화
- 이미지 최적화
- 웹 폰트 최적화
```

자세한 개선 방법은 알아두어야할 개념이 있어서 따로 정리 해두겠다.

- 참고자료
  [webdev-LCP](https://web.dev/lcp/)

---

### TBT(Total Blocking Time)
