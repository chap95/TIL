import { IInvoice, IPerformace, IPlays, PlayType } from './rawCode';

// 2. 임시 변수를 질의 함수로 바꾸기 
// amountFor 안에서 play는 aPerformance를 통해 얻을 수 있기 때문에 임시 변수를 제거한다.
// 지역적 범위에 존재하는 이름이 늘어나서 추출작업이 어렵기 때문이다.
// amountFor를 호출하는 반복문 안에서 보면 play는 perf에 따라 변한다. amountFor에 play 값과 perf 값을
// 따로 전달하는 건 이상해 보인다. amountFor안에서 play 값을 결정해주면 좋아보인다.
// 앞으로 진행할 리펙터링에서 방해요소가 될 수도 있다.

function statement(invoice: IInvoice, plays: IPlays) {
  // 1. amountFor
  function amountFor(aPerformance: IPerformace) { // play 파라미터가 있었지만 play를 내부에서 정해주기 때문에 파라미터에서 제거해 줬다.
    let result = 0;
		const play = playFor(aPerformance); // aPerformace에 따라 변하는 값 함수로 추출
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
    return result;
  }
  // 2. playFor
  function playFor(aPerformance: IPerformace) {
    return plays[aPerformance.playID];
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
   // const play: IPlays = plays[perf.playID];  play 라는 변수를 playFor 함수로 인라인 시켰다. 임시 변수 사용을 최소화 하기 위해

    volumeCredits += Math.max(perf.audiance - 30, 0);
    if (playFor(perf).type === PlayType.COMEDY) {
      volumeCredits += Math.floor(perf.audiance / 5);
    }

    result += ` ${playFor(perf).name}: ${format(amountFor(perf) / 100)} (${
      perf.audiance
    }석)\n`;

    totalAmount += amountFor(perf);
  }

  result += `총액: ${format(totalAmount)}\n`;
  result += `적립 포인트: ${volumeCredits}점 \n`;

  return result;
}
