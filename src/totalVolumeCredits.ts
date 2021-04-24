import { IInvoice, IPerformace, IPlays, PlayType } from './rawCode';

// volumeCredits을 누적시키는 로직을 추상화한다.
// 누적시키는 로직을 함수 내부로 들여온다.
// 반복문에서 volumeCredits를 사용하는 부분을 제거한다.
// volumeCredits 변수를 사용할 이유가 없어진다. 변수를 함수로 변경한다.
// 유효범위가 있는 변수하나가 사라진다. 리펙터링하기가 훨씬 쉬워진다.
// 반복문을 위해 존재하던 임시변수 사용을 제거할 수 있다.

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

	// 5. totalVolumeCredits
	function totalVolumeCredits() {
		
		let volumeCredits = 0;
		for (let perf of invoice.preformances){
			volumeCredits += volumeCreditsFor(perf);
		}

		return volumeCredits
	}

  let totalAmount = 0;
  let result = `청구 내역 (고객명 ${invoice.customer}\n`;
  
  for (let perf of invoice.preformances) {
   

    result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${
      perf.audiance
    }석)\n`;

    totalAmount += amountFor(perf);
  }

  result += `총액: ${usd(totalAmount)}\n`;
  result += `적립 포인트: ${totalVolumeCredits()}점 \n`;

  return result;
}
