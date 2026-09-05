import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";
import { StatsUpdate, StatsUpdateHelper } from "./stats";

export class TurnChangeAction extends BattleAction {
  public actionType: ActionType = ActionType.TURN_CHANGE;
  public subactions: BattleAction[] = [];

  constructor(
    public actionNumber: number,
    public turn: number,
  ) {
    super();
  }

  getStats(): StatsUpdate {
    return StatsUpdateHelper.getEmptyStatsUpdate();
  }

  getDescription(): string {
    return `The turn counter became ${this.turn}!`;
  }

  static fromJSON(json: { [key: string]: any; }): TurnChangeAction | undefined {
    const actionType = json["actionType"];
    if (actionType == ActionType.TURN_CHANGE) {
      return new TurnChangeAction(
        json["actionNumber"] as number,
        json["turn"] as number,
      );
    } else {
      console.error(`TurnChangeAction.fromJSON called on ${json}`);
      return undefined;
    }
  }
}