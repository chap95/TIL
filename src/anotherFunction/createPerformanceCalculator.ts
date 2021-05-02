import PerformanceCalculator from "../class/performanceCalculator";
import { IPlays, PlayType } from "../rawCode";
import { INewPerformance } from "../renderPlainText";

// 조건부 로직을 다형성으로 변경
// 이와 같은 구조 객체 지향 코드 
// 설멍 : 추상화 뒤로 멤버 변수(자료 or data)를 숨기고 멤버 변수에 접근할 수 있는 함수를 제공한다.
// 장점 : 함수 수정없이 새로운 클래스를 만들기 쉽다.
// 단점 : 메소드가 추가, 삭제 될 일이 많은 경우 모든 클래스를 수정해 줘야하는 단점이 있다.
// 이런한 구조는 메소드가 추가 또는 삭제 될 일은 적으나 클래스가 추가 또는 삭제 될 일이 빈버한 경우 유용한 구조다.

// 조건부 로직을 다형성으로 분리하는 작업을 할 코드
// performanceCalculator 클래스를 선언하여 자식 클래스를 만들어 case 별로 대응
// case가 추가 될 때마다 하나의 함수에서 복잡한 연산을 하는 방식에서 
// case 분리만 아래의 함수에서 하고 복잡한 로직은 각각의 자식 클래스에서 하는 방식
// 코드가 깔끔해지고 관심사도 분리할 수 있다.

export function createPerformanceCalculator(aPerformace: INewPerformance, aPlay: IPlays){
  switch(aPlay.type){
    case PlayType.TRAGEDY:
      return new TragedyCalculator(aPerformace, aPlay);
    case PlayType.COMEDY:
      return new ComedyCalculator(aPerformace, aPlay);
    default:
      throw new Error(`알 수 없는 장르 -> ${aPlay.type}`)
  }
}

class TragedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 40000;
    if(this.performance.audiance > 30){
      result += 1000 * (this.performance.audiance - 30);
    }
    return result
  }
}

class ComedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 40000;
    if(this.performance.audiance > 30){
      result += 1000 * (this.performance.audiance - 30);
    }
    return result;
  }

  get volumeCredits() {
    return super.volumeCredits + Math.floor(this.performance.audiance / 5);
  }
}