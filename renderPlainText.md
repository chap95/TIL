# renderPlainText.  
   

난무하는 중첩함수들을 다른 함수로 분리시키는 작업입니다.   
statement함수에 data를 위한 로직과 HTML을 랜더하는 로직을 분리시키는 작업입니다.   
   
장점 : 관심사를 분리시켜 유지보수에 도움을 줌
   
단점 : 코드량이 증가하고 함수의 depth가 깊어진다. 로직이 복잡하지 않은 경우에 이러한 방식으로 코드를 나누어 놓으면 역효과를 가져옴 
   
data를 생성해 줄 때, 필요한 값을 result에 할당한 후 다음 값을 할당하기 위해서 사용한 result를 다음 함수의 인자로 넘겨주기 때문에   
interface로 타입을 정해줄 때 모든 속성을 optional로 처리를 했습니다.   
   
key : value 스타일로 interface를 정의해주려 했으나 여러 타입이 들어올 수 있어서 타입을 정하는데에도 애매한 부분이 존재합니다.   
* * *
   
### [코드](https://github.com/chap95/TIL/blob/master/src/anotherFunction/createStatementData.ts)   
createStatementData 함수로 중첩함수들을 분리시키고 renderPlainText에 데이터를 가지고 텍스트를 반환하는 로직을 넣음
