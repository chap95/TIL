import { IInvoice, IPerformace, IPlays, PlayType } from './rawCode';


// volumeCredits를 함수로 추출하는 작업이다.
// 반복문을 돌면서 값을 누적하는 방식이기 때문에 까다로울 수 있으나
// volumeCredits를 함수에서 초기화 시켜준다.

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

  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명 ${invoice.customer}\n`;
  const format = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format;

  for (let perf of invoice.preformances) {
    let thisAmount = amountFor(perf); 
    volumeCredits += volumeCreditsFor(perf); // 추출한 함수를 이용해 값을 누적시킨다. 아래의 로직들을 추상화 시켜 코드가 깔끔해졌다. :)

    result += ` ${playFor(perf).name}: ${format(thisAmount / 100)} (${
      perf.audiance
    }석)\n`;

    totalAmount += thisAmount;
  }

  result += `총액: ${format(totalAmount)}\n`;
  result += `적립 포인트: ${volumeCredits}점 \n`;

  return result;
}
