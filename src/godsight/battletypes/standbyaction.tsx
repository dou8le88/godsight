import { JSX } from "react/jsx-runtime";
import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";
import { StatsUpdate, StatsUpdateHelper } from "./stats";
import { assertNotNullOrUndefined, assertNotUndefined } from "../../util/assert";
import { GodsightSettings } from "../settings/godsightsettings";

export class StandbyAction extends BattleAction {
  public actionType: ActionType = ActionType.STANDBY;
  public subactions: BattleAction[] = [];

  constructor(
    public actorName: string,
    public standby: boolean,
    public beforeBossTurn: boolean,
    public battleMessage: string | null,
  ) {
    super();
  }

  getStats(): StatsUpdate {
    return StatsUpdateHelper.getEmptyStatsUpdate();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getDescription(key: number, settings: GodsightSettings): JSX.Element {
    let message = `${this.actorName} can't attack!`;
    if (this.battleMessage) {
      message = `${this.battleMessage} They can't attack!`;
    }

    return (
      <div key={key} className="action-description">{message}</div>
    );
  }

  static override fromJSON(json: Record<string, unknown>): StandbyAction | undefined {
    const actionType = json["actionType"];
    if (actionType == ActionType.STANDBY) {
      return new StandbyAction(
        assertNotNullOrUndefined(json["actorName"] as string),
        assertNotNullOrUndefined(json["standby"] as boolean),
        assertNotNullOrUndefined(json["beforeBossTurn"] as boolean),
        assertNotUndefined(json["battleMessage"] as string | null),
      );
    } else {
      console.error(`StandbyAction.fromJSON called on ${json}`);
      return undefined;
    }
  }
}