### 2. 임시변수를 질의 함수로 바꾸기   
   
* * *
   
amountFor를 호출하는 반복문을 보면 perf 값에 따라 play값을 결정해 줍니다.   
이 값을 따로 amountFor에 따로 전달해주기 때문에 지역적 이름이 늘어나서 추출 작업이 복잡해집니다.   
amountFor 안에서 play 값을 결정해주는게 좋아보입니다.   
play 값을 결정해주는 playFor 함수를 만들어 줍시다.  

* * *
[코드](https://github.com/chap95/TIL/blob/master/playFor.ts)
