import { IInvoice, IPerformace, IPlays, PlayType } from "./rawCode";





function statement(invoice: IInvoice, plays: IPlays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명 ${invoice.customer}\n`;
  const format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format;
	
// 1. 함수 추출하기 switch case문으로 입장료를 계산하던 로직을 함수로 만들기
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

  for (let perf of invoice.preformances) {
    const play: IPlays = plays[perf.playID];
    let thisAmount = amountFor(perf, play); // 아래에 있던 switch case를 amountFor 함수로 추출

    volumeCredits += Math.max(perf.audiance - 30, 0); //포인트 적립
    if (play.type === PlayType.COMEDY) {
      volumeCredits += Math.floor(perf.audiance / 5);
    }

    result += ` ${play.name}: ${format(thisAmount / 100)} (${
      perf.audiance
    }석)\n`;

    totalAmount += thisAmount;
  }

  result += `총액: ${format(totalAmount)}\n`;
  result += `적립 포인트: ${volumeCredits}점 \n`;

  return result;
}
