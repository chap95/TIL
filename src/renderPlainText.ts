import createStatementData from './anotherFunction/createStatementData';
import { IInvoice, IPerformace, IPlays, PlayType } from './rawCode';

// 단계 쪼개기
// 앞에서 만들었던 함수들은 모두 다 statement안에 중첩함수 형태로 존재해 있었다.
// 하지만 앞으로 추가 될 기능들과 관심사를 분리시키기 위해서 statement의 단계를 나눠야 할 것 같다.
// 1단계에서는 statement 함수에 필요한 데이터를 처리하는 단계이다.
// 2단계에서는 1단계에서 처리한 결과를 통해 HTML을 표현하는 단계이다.
// 아래 코드는 2단계에 해당하는 로직을 분리시키는 작업이다.

export interface INewPerformance extends IPerformace {
	customer?: string;
	performance?: IPerformace;
	play?: IPlays;
	amount?: number;
	volumeCredits?: number;
	
}

export interface INewInvoice {
	customer: string;
	performances: INewPerformance[];
	totalVolumeCredits?: number;
	totalAmount?: number;
}



function statement(invoice: IInvoice, plays: IPlays) {
	// renderPlainText 라는 함수로 관심사를 분리시켰다.
  return renderPlainText(createStatementData(invoice, plays)); // data를 세팅 하는 로직을 다른 파일로 분리
}

function renderPlainText(data: INewInvoice){
	// 4. format 
	function usd(aNumber: number){
		return new Intl.NumberFormat("en-US", {
			style: 'currency',
			currency: 'USD',
			minimumFractionDigits: 2,
		}).format(aNumber/100); // 함수 하단 부에 있는 format(thisAmount / 100) 부분도 함수 내부로 들어왔다.
	}

  let result = `청구 내역 (고객명 ${data.customer}\n`;
  
  for (let perf of data.performances) {
    result += ` ${perf.play.name}: ${usd(perf.amount)} (${
      perf.audiance
    }석)\n`;

    
  }

  result += `총액: ${usd(data.totalAmount)}\n`;
  result += `적립 포인트: ${data.totalVolumeCredits}점 \n`;

  return result;
}
