import { JSX } from "react/jsx-runtime";
import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";
import { StatsUpdate, StatsUpdateHelper } from "./stats";
import { assertNotNullOrUndefined } from "../../util/assert";

export class WindowEffectAction extends BattleAction {
  public actionType: ActionType = ActionType.WINDOW_EFFECT;
  public subactions: BattleAction[] = [];

  constructor(
    public actionNumber: number,
    public name: string,
  ) {
    super();
  }

  getDescription(): JSX.Element {
    return (
      <div key={this.actionNumber} className="action-description">The window effect {this.name} was activated!
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
        assertNotNullOrUndefined(json["actionNumber"] as number),
        assertNotNullOrUndefined(json["name"] as string),
      );
    } else {
      console.error(`WindowEffectAction.fromJSON called on ${json}`);
      return undefined;
    }
  }
}