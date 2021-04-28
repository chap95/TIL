import { IPerformace, IPlays, PlayType } from "../rawCode"
import { INewPerformance } from "../renderPlainText"

export default class PerformanceCalculator  {
	performance: INewPerformance;
	play: IPlays;
	
  constructor(aPerformance: INewPerformance, aPlay: IPlays){
		this.performance = aPerformance;
		this.play = aPlay;
	}

	get volumeCredits() {
		return Math.max(this.performance.audiance - 30, 0);
	}
	// 나머지 로직은 case 별로 클래스를 생성하여 구현했다.
}