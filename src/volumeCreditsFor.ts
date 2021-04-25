import { IInvoice, IPerformace, IPlays, PlayType } from './rawCode';

// volumeCredits를 함수로 추출하는 작업 + format 변수를 함수로 추출하는 작업
// volumeCredits은 반복문을 돌면서 값을 누적하는 방식이기 때문에 까다로울 수 있으나
// volumeCredits을 함수에서 초기화 시켜준다.
// ---------------------------------------
// 화폐단위를 결정해주는 format 변수에 값을 정해주는 로직을 추상화 시킨다.
// format이라는 함수 이름을 사용해야 하지만 이름이 의미가 명확하지 않아 usd로 바꿔준다.
// 이 부분은 앞에서 했던 설명과 맥락이 같고 간단해서 md 파일로 정리하지 않았다.

function statement(invoice: IInvoice, plays: IPlays) {
  // 1. amountFor
  function amountFor(aPerformance: IPerformace) { 
    let result = 0;
		const play = playFor(aPerformance); 
    switch (play.type) {
      case PlayType.TRAGEDY: 
        result = 40000;
        if (aPerformance.audiance > 30) {
          result += 1000 * (aPerformance.audiance - 30);
        }
        break;
      case PlayType.COMEDY:
        result = 30000;
        if (aPerformance.audiance > 20) {
          result += 10000 + 500 * (aPerformance.audiance - 20);
        }
        result += 300 * aPerformance.audiance;
      break;
      default:
        throw new Error(`알 수 없는 장르 ${play}`);
    }
    return result;
  }
  // 2. playFor
  function playFor(aPerformance: IPerformace) {
    return plays[aPerformance.playID];
  }

	// 3. volumeCreditsFor
	function volumeCreditsFor(aPerformance: IPerformace) {
		let volumeCredits = 0;
		volumeCredits += Math.max(aPerformance.audiance - 30,0);
		if(playFor(aPerformance) === PlayType.COMEDY){
			volumeCredits += Math.floor(aPerformance.audiance / 5);
		}
		return volumeCredits
	}

	// 4. format 
	function usd(aNumber: number){
		return new Intl.NumberFormat("en-US", {
			style: 'currency',
			currency: 'USD',
			minimumFractionDigits: 2,
		}).format(aNumber/100); // 함수 하단 부에 있는 format(thisAmount / 100) 부분도 함수 내부로 들어왔다.
	}

  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명 ${invoice.customer}\n`;
  

  for (let perf of invoice.performances) {
    volumeCredits += volumeCreditsFor(perf); // 추출한 함수를 이용해 값을 누적시킨다. 아래의 로직들을 추상화 시켜 코드가 깔끔해졌다. :)

    result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${
      perf.audiance
    }석)\n`;

    totalAmount += amountFor(perf);
  }

  result += `총액: ${usd(totalAmount)}\n`;
  result += `적립 포인트: ${volumeCredits}점 \n`;

  return result;
}
