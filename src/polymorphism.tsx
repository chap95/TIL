import createStatementData from './anotherFunction/createStatementData';
import { IInvoice, IPerformace, IPlays, PlayType } from './rawCode';
import { INewInvoice, INewPerformance } from './renderPlainText';

// 다형성을 이용한 분기처리 로직 분리

function statement(invoice: IInvoice, plays: IPlays) {
	// renderPlainText 라는 함수로 관심사를 분리시켰다.
  return renderPlainText(createStatementData(invoice, plays)); // data를 세팅 하는 로직을 다른 파일로 분리
}

function renderPlainText(data: INewInvoice){
	// 4. format 
	
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

function usd(aNumber: number){
	return new Intl.NumberFormat("en-US", {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2,
	}).format(aNumber/100); // 함수 하단 부에 있는 format(thisAmount / 100) 부분도 함수 내부로 들어왔다.
}


function htmlStatement(invoice: IInvoice, plays: IPlays){
	return renderHtml(createStatementData(invoice, plays))
}

function renderHtml(data: INewInvoice){
	return <>
		<h1>청구 내역 ( 고객명 {data.customer} )</h1>
		<table>
			<tr>
				<th>연극</th>
				<th>좌석 수</th>
				<th>금액</th>
			</tr>
			{data.performances.map((value: INewPerformance, index: number) => {
				return <>
				<tr>
					<td>{value.play.name}</td>
					<td>{value.audiance}</td>
				</tr>
				<td>{usd(value.amount)}</td>
				</>
			})}
		</table>
		<p>총액 : {usd(data.totalAmount)}</p>
		<p>적립 포인트 : {data.totalVolumeCredits}</p>
	</>
}
