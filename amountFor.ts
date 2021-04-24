import { IPerformace, IPlays, PlayType } from "./raw_code";

export default function amountFor(aPerformance: IPerformace, play: IPlays) {
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