// 이 코드는 리펙터링 2판 statement 함수를 js 에서 ts로 변환한 코드입니다. :)
// 연극 관련 코드

export enum PlayType {
  TRAGEDY = "tragedy",
  COMEDY = "comedy",
}

export interface IPlays {
  name: string;
  type: PlayType;
}

export interface IPerformace {
  playID: string;
  audiance: number;
}

export interface IInvoice {
  performances: IPerformace[];
  customer: string;
}

function statement(invoice: IInvoice, plays: IPlays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명 ${invoice.customer}\n`;
  const format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format;

  for (let perf of invoice.performances) {
    const play: IPlays = plays[perf.playID];
    let thisAmount = 0;
    
    switch (play.type) {
      case PlayType.TRAGEDY: //비극
        thisAmount = 40000;
        if (perf.audiance > 30) {
          thisAmount += 1000 * (perf.audiance - 30);
        }
        break;
      case PlayType.COMEDY: //희극
        thisAmount = 30000;
        if (perf.audiance > 20) {
          thisAmount += 10000 + 500 * (perf.audiance - 20);
        }
        thisAmount += 300 * perf.audiance;
        break;
      default:
        throw new Error(`알 수 없는 장르 ${play}`);
    }

    volumeCredits += Math.max(perf.audiance - 30, 0);
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
