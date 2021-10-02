# Performance

성능개선 전 알아둬야 할 개념 정리 및 성능 개선 과정을 담아보았다.

---

#### LCP(Largest Contentful Paint)

구글 라이트하우스에서는 FCP(First Contentful Paint)에 관한 지표를 점수로 반영을 한다. 이 지표는 컨텐츠가 그려지기 시작하는 시점을 측정한다.하지만 웹 사용자 입장에서는 지표가 처음 그려지는 시점은 웹 사용에 큰 영향을 안 줄 수 있다.

더 필요한 지표는 랜더가 시작된 이후에 대한 정보가 사용자의 웹 페이지 사용성에 영향을 주는 요소가 많다. 그래서 FCP 가 시작 된 이후의 정보도 성능 지표에 추가할 필요가 있었다.

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
