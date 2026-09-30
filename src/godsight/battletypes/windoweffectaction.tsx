import { JSX } from "react/jsx-runtime";
import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";
import { StatsUpdate, StatsUpdateHelper } from "./stats";
import { assertNotNullOrUndefined } from "../../util/assert";
import { DamageDisplay } from "../settings/godsightsettings";

export class WindowEffectAction extends BattleAction {
  public actionType: ActionType = ActionType.WINDOW_EFFECT;
  public subactions: BattleAction[] = [];

  constructor(
    public name: string,
    public beforeBossTurn: boolean,
  ) {
    super();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getDescription(key: number, damageDisplay: DamageDisplay): JSX.Element {
    return (
      <div key={key} className="action-description">The window effect {this.name} was activated!
      </div>
    );
  }

  getStats(): StatsUpdate {
    return StatsUpdateHelper.getEmptyStatsUpdate();
  }

  static fromJSON(json: Record<string, unknown>): WindowEffectAction | undefined {
    const actionType = json["actionType"];
    if (actionType == ActionType.WINDOW_EFFECT) {
      return new WindowEffectAction(
        assertNotNullOrUndefined(json["name"] as string),
        assertNotNullOrUndefined(json["beforeBossTurn"] as boolean),
      );
    } else {
      console.error(`WindowEffectAction.fromJSON called on ${json}`);
      return undefined;
    }
  }
}