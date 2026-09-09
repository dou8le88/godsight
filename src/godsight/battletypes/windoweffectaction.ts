import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";
import { StatsUpdate, StatsUpdateHelper } from "./stats";

export class WindowEffectAction extends BattleAction {
  public actionType: ActionType = ActionType.WINDOW_EFFECT;
  public subactions: BattleAction[] = [];

  constructor(
    public actionNumber: number,
    public name: string,
  ) {
    super();
  }

  getSimpleDescription(): string {
    return `Window effect ${this.name} was activated!`;
  }

  getStats(): StatsUpdate {
    return StatsUpdateHelper.getEmptyStatsUpdate();
  }

  static fromJSON(json: { [key: string]: any; }): WindowEffectAction | undefined {
    const actionType = json["actionType"];
    if (actionType == ActionType.WINDOW_EFFECT) {
      return new WindowEffectAction(
        json["actionNumber"] as number,
        json["name"] as string,
      );
    } else {
      console.error(`WindowEffectAction.fromJSON called on ${json}`);
      return undefined;
    }
  }
}