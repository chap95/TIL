# TIL
오배점(오늘 내가 배운 점)

리페터링 2판을 읽고 raw_code.ts 파일은
책에 나온 코드를 타입스크립트로 변경한 파일입니다. 참고해 주세요!



* * *


statement 함수는 연극 종류에 따른 연극비 계산과 포인트를 적립하는 
함수입니다. 리펙터링 2판에 나온 예제 코드입니다.

1. 함수 추출하기
-> 연극 종류에 따른 가격계산을 하는 switch case 문을 함수로 추출합니다.
-> 중첩 함수로 만들면 파라미터로 넘길 것이 줄어든다. aPerformance , play
파라미터가 없을 수록 함수가 간단해 지지만 직관성은 조금 떨어질 수 있다고 생각한다.


<pre><code>
function amountFor(aPerformance: IPerformace, play: IPlays) {
	let result = 0;
	switch (play.type) {
		case PlayType.TRAGEDY: //비극
			result = 40000;
			if (aPerformance.audiance > 30) {
				result += 1000 * (aPerformance.audiance - 30);
			}
			break;
		case PlayType.COMEDY: //희극
			result = 30000;
			if (aPerformance.audiance > 20) {
				result += 10000 + 500 * (aPerformance.audiance - 20);
			}
			result += 300 * aPerformance.audiance;
			break;
		default:
			throw new Error(`알 수 없는 장르 ${play}`);
		}
	return result
}
</code></pre>

