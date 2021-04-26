### 반복문 쪼개기   
   
* * *
   
반복문 안에 volumeCredits 를 누적시키는 로직을 함수로 추출합니다.   
여기서 반복문의 일부 로직을 쪼개서 함수 내부로 들여옵니다.   
이렇게 하면 지역적으로 사용하던 임시 변수인 volumeCredits를 없애서 리펙터링 하기 더 편리해집니다.   
반복문 쪼개기를 통해 값을 누적시키기 위해 사용하던 임시 변수 하나를 제거할 수 있습니다.   
   
* * *
   
### [코드](https://github.com/chap95/TIL/blob/master/src/totalVolumeCredits.ts)