import { JSX } from "react/jsx-runtime";
import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";
import { StatsUpdate, StatsUpdateHelper } from "./stats";
import { assertNotNullOrUndefined, assertNotUndefined } from "../../util/assert";

export class StandbyAction extends BattleAction {
  public actionType: ActionType = ActionType.STANDBY;
  public subactions: BattleAction[] = [];

  constructor(
    public actionNumber: number,
    public actorName: string,
    public standby: boolean,
    public battleMessage: string | null,
  ) {
    super();
  }

  getStats(): StatsUpdate {
    return StatsUpdateHelper.getEmptyStatsUpdate();
  }

  getDescription(): JSX.Element {
    const baseMessage = `${this.actorName} couldn't attack!`;
    let fullMessage = baseMessage;
    if (this.battleMessage) {
      fullMessage = `${this.battleMessage} ${baseMessage}`
    }

    return (
      <div key={this.actionNumber} className="action-description">{fullMessage}</div>
    );
  }

  static fromJSON(json: { [key: string]: any; }): StandbyAction | undefined {
    const actionType = json["actionType"];
    if (actionType == ActionType.STANDBY) {
      return new StandbyAction(
        assertNotNullOrUndefined(json["actionNumber"] as number),
        assertNotNullOrUndefined(json["actorName"] as string),
        assertNotNullOrUndefined(json["standby"] as boolean),
        assertNotUndefined(json["battleMessage"] as string | null),
      );
    } else {
      console.error(`StandbyAction.fromJSON called on ${json}`);
      return undefined;
    }
  }
}