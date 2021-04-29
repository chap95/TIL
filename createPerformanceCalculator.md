# createPerformaceCalculator
   
* * *
   
조건부 로직을 다형성으로 분리하기   
   
이번 리펙토링은 switch case 문을 performaceCalculator 클래스를 이용하여 분리하는 작업입니다.   
   
1. createPerformanceCalculator 라는 함수를 통해 case만 분기처리합니다.   
2. performanceCalculator 클래스를 상속받는 자식 클래스를 case 별로 생성해 줍니다. 여기서는 비극과 희극이 되겠네요.   
3. 원래 case 별로 있던 로직을 자식 클래스의 메소드로 정의해줍니다.   
4. 공통적인 로직은 부모 클래스에 정의하고 상속받아 사용해줍시다.   
   
이렇게 되면 어느정도 추상화가 되어 코드가 더 깔끔해 집니다.   

* * *
   
### 정리 + 느낀점
   
-> 객체지향 구조로 분기처리를 한다면 함수의 갱신, 삭제, 생성에 있어 불편함이 있지만   
이런 경우에 극장의 공연료 계산 방법이 크게 변경되지 않는 이상 불편해 보이지 않아보입니다.   
다만 걱정되는 부분은 credit을 적립하는 부분에 있어 극장의 정책이 자주 추가되거나 이벤트를 진행할 경우   
로직 수정이 빈번해져 다른 처리가 필요해보입니다.   
   
-> 객체지향 구조는 새로운 클래스를 추가하는데 유리합니다. 새로운 장르의 영화가 추가 될 때마다 큰 이점을  
가진다 생각합니다.   
   
추신 ) 이 극장은 카테고리별로 값을 계산하는게 신기하다. 예시 코드지만 보면서 조금 이상하다 생각함 ㅋㅋ   
   
* * *
   
### 관련코드   
   
[1. case 별 클래스와 인스턴스 생성](https://github.com/chap95/TIL/blob/master/src/anotherFunction/createPerformanceCalculator.ts)   
[2. performance calculator 클래스](https://github.com/chap95/TIL/blob/master/src/class/performanceCalculator.ts)   
   

