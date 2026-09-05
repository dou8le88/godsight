import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";
import { StatsUpdate, StatsUpdateHelper } from "./stats";

export class OmenCancelAction extends BattleAction {
  public actionType: ActionType = ActionType.OMEN_CANCELLED;
  public subactions: BattleAction[] = [];

  constructor(
    public actionNumber: number,
    public canceledBossPosition: number,
  ) {
    super();
  }

  getStats(): StatsUpdate {
    return StatsUpdateHelper.getEmptyStatsUpdate();
  }

  getDescription(): string {
    return `${this.canceledBossPosition}'s omen was canceled!`;
  }

  static fromJSON(json: { [key: string]: any; }): OmenCancelAction | undefined {
    const actionType = json["actionType"];
    if (actionType == ActionType.OMEN_CANCELLED) {
      return new OmenCancelAction(
        json["actionNumber"] as number,
        json["canceledBossPosition"] as number,
      );
    } else {
      console.error(`OmenCancelAction.fromJSON called on ${json}`);
      return undefined;
    }
  }
}