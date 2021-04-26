import { IPerformace, IPlays, PlayType } from "../rawCode"
import { INewPerformance } from "../renderPlainText"

// 조건부 로직을 다형성으로 바꾸기
// amountFor 함수에 위치한 조건부 로직은 수정이 거듭되면 로직이 복잡해 질 가능성이 있다.
// 상속 계층을 구현하여 계산 로직을 정의하는 것이 목표
// 이 구조를 통해 호출하는 쪽에서는 계산 함수만 호출하면 되고
// 비극이냐 희극이냐에 따라 계산 함수 내부에서 처리한다.

export default class PerformanceCalculator  {
	performance: INewPerformance;
	play: IPlays;
	
  constructor(aPerformance: INewPerformance, aPlay: IPlays){
		this.performance = aPerformance;
		this.play = aPlay;
	}


	// class 외부에 있던 amountFor 함수를 class 내부로 들여온다.
	// get 으로 필드에 접근을 가능하게 만들어주고 파라미터를 없앤다.
	get amountFor() { 
		let result = 0;

		switch (this.play.type) {
			case PlayType.TRAGEDY: 
				result = 40000;
				if (this.performance.audiance > 30) {
					result += 1000 * (this.performance.audiance - 30);
				}
				break;
			case PlayType.COMEDY:
				result = 30000;
				if (this.performance.audiance > 20) {
					result += 10000 + 500 * (this.performance.audiance - 20);
				}
				result += 300 * this.performance.audiance;
			break;
			default:
				throw new Error(`알 수 없는 장르 ${this.play.type}`);
		}
		return result;
	}

	get volumeCredits() {
		let volumeCredits = 0;
		volumeCredits += Math.max(this.performance.audiance - 30,0);
		if(this.performance.play.type === PlayType.COMEDY){
			volumeCredits += Math.floor(this.performance.audiance / 5);
		}
		return volumeCredits
	}
}