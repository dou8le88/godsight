import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";
import { StatsUpdate, StatsUpdateHelper } from "./stats";

export class StandbyAction extends BattleAction {
  public actionType: ActionType = ActionType.STANDBY;
  public subactions: BattleAction[] = [];

  constructor(
    public actionNumber: number,
    public position: number,
    public standby: boolean,
    public battleMessage?: string,
  ) {
    super();
  }

  getStats(): StatsUpdate {
    return StatsUpdateHelper.getEmptyStatsUpdate();
  }

  getDescription(): string {
    const baseMessage = `Player at position ${this.position} couldn't attack!`;
    if (this.battleMessage) {
      return `${this.battleMessage} ${baseMessage}`
    } else {
      return baseMessage;
    }
  }

  static fromJSON(json: { [key: string]: any; }): StandbyAction | undefined {
    const actionType = json["actionType"];
    if (actionType == ActionType.STANDBY) {
      return new StandbyAction(
        json["actionNumber"] as number,
        json["position"] as number,
        json["standby"] as boolean,
        json["battleMessage"] as string | undefined,
      );
    } else {
      console.error(`StandbyAction.fromJSON called on ${json}`);
      return undefined;
    }
  }
}