import PerformanceCalculator from "../class/performanceCalculator";
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

	function enrichPerformance(aPerformance: INewPerformance){
		const result:INewPerformance = Object.assign({}, aPerformance);
		const calculrator = new PerformanceCalculator(aPerformance, playFor(aPerformance));
		// 다형성 처리를 위한 추가 구현 코드 
		result.play = calculrator.play;
		result.amount = calculrator.amountFor; // 원본 amountFor 대신 계산기 클래스의 인스턴스 함수를 활용한다.
		result.volumeCredits = calculrator.volumeCredits; // 원본 함수 대신 계산기 인스턴스 이용
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

	// 다형성 amountFor
	function newAmountFor(aPerformance: INewPerformance){
		return new PerformanceCalculator(aPerformance, playFor(aPerformance)).amountFor
		// 원본 amountFor가 작업을 위임하도록 변경한다.
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

  // 다형성 volumeCreditsFor
  function newVolumeCreditsFor(aPerformace: INewPerformance){
    return new PerformanceCalculator(aPerformace, playFor(aPerformace)).volumeCredits
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