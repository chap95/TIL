import { IInvoice, IPerformace, IPlays, PlayType } from "../rawCode";
import { INewInvoice, INewPerformance } from "../renderPlainText";

export default function createStatementData(invoice: IInvoice, plays: IPlays){
	const result: INewInvoice = {
		customer: invoice.customer,
		performances: invoice.performances.map(enrichPerformance),
	};
	result.totalVolumeCredits = totalVolumeCredits(result)
	result.totalAmount = totalAmount(result);

	return result;

	function enrichPerformance(aPerformance: IPerformace){
		const result:INewPerformance = Object.assign({}, aPerformance);
		// Object.assign 을 한 이유는 얕은 복사를 하기 위해서
		// 왜 때문에 얕은 복사를 할까? 함수로 건넨 데이터를 수정하기 싫어서 mutable한 데이터는 쉽게 상하기 때문
		result.play = playFor(result);
		result.amount = amountFor(result);
		result.volumeCredits = volumeCreditsFor(result);
		return result
	}

	// 2. playFor

	function playFor(aPerformance: INewPerformance) {
		return plays[aPerformance.playID];
	}

	// 1. amountFor
	function amountFor(aPerformance: INewPerformance) { 
		let result = 0;
		const play = aPerformance.play; 
		switch (aPerformance.play.type) {
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

	// 3. volumeCreditsFor
	function volumeCreditsFor(aPerformance: INewPerformance) {
		let volumeCredits = 0;
		volumeCredits += Math.max(aPerformance.audiance - 30,0);
		if(aPerformance.play.type === PlayType.COMEDY){
			volumeCredits += Math.floor(aPerformance.audiance / 5);
		}
		return volumeCredits
	}

	// 5. totalVolumeCredits

	function totalVolumeCredits(data: INewInvoice) {
		let result = 0;

		for (let perf of data.performances){
			result += perf.volumeCredits;
		}

		return result
	}

	// 총 비용을 계산하는 로직
	function totalAmount(data: INewInvoice){
		let result = 0;

		for (let perf of data.performances){
			result += perf.amount;
		} // 책에서는 reduce를 이용했지만 TS에서는 안된다 ... 타입이 달라 사용이 안되는 걸까?

		return result
		 
	}
}