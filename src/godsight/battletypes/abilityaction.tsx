import { JSX } from "react/jsx-runtime";
import { Actor } from "../../gbf/battletypes/scenariodata/mechanics/actor";
import { GameElementHelper } from "../../gbf/battletypes/scenariodata/mechanics/element";
import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";
import { BattleActionParser } from "./battleactionparser";
import { StatsUpdate, StatsUpdateHelper } from "./stats";
import { assertNotNullOrUndefined } from "../../util/assert";

export class AbilityAction extends BattleAction {
  public actionType: ActionType = ActionType.ACTIVATED_ABILITY;
  public overrideMessage = "";

  constructor(
    public name: string,
    public actor: Actor,
    public sourceName: string,
    public sourceIndex: number,
    public partySize: number,
    public subactions: BattleAction[],
  ) {
    super();
  }

  getDescription(key: number): JSX.Element {
    if (this.overrideMessage) {
      return (
        <div key={key} className="action-description" >{this.overrideMessage}
          {
            this.subactions.map((subaction, idx) => (
              subaction.getDescription(idx)
            ))
          }
        </div>
      );
    } else {
      return (
        <div className="action-description"> {this.sourceName} activated {this.name}!
          {
            this.subactions.map((subaction, idx) => (
              subaction.getDescription(idx)
            ))
          }
        </div>
      );
    }

  }

  getStats(): StatsUpdate {
    const update = StatsUpdateHelper.getEmptyStatsUpdate(this.partySize);
    const subactionStatsUpdates = this.subactions.map(action => action.getStats());
    const allUpdates = subactionStatsUpdates.reduce(
      (prev, cur) => StatsUpdateHelper.concatUpdates(prev, cur),
      update,
    );
    switch (this.actor) {
      case Actor.PLAYER: {
        // The subactions have no way to associate certain general stats with
        // a specific character, so we must do it here for now. TODO: fix.
        const subactionHitCount = allUpdates["generalStats"]["hitCount"];
        const subactionDebuffs = allUpdates["generalStats"]["debuffsInflictedCount"];
        const subactionSkillDamage = allUpdates["generalStats"]["skillDamage"];
        const subactionNormalAttackDamage = allUpdates["generalStats"]["normalAttackDamage"];

        allUpdates["characterStats"][this.sourceIndex]["hitCount"] += subactionHitCount;
        allUpdates["characterStats"][this.sourceIndex]["debuffsInflictedCount"] += subactionDebuffs;
        GameElementHelper.getAllElements().forEach(element => {
          allUpdates["characterStats"][this.sourceIndex]["skillDamage"][element] += subactionSkillDamage[element];
          allUpdates["characterStats"][this.sourceIndex]["normalAttackDamage"][element] += subactionNormalAttackDamage[element];
        });
        break;
      }
      case Actor.BOSS:
        // The boss used an "ability", can happen in certain raids.
        // Due to the quirks of the underlying commands, stats should be tracked correctly
        // via subactions in this case.
        break;
      default:
        console.error(`Got unknown target ${this.actor} for AbilityAction`);
        break;
    }

    return allUpdates;
  }

  static override fromJSON(json: Record<string, unknown>): AbilityAction | undefined {
    const actionType = json["actionType"];
    if (actionType == ActionType.ACTIVATED_ABILITY) {
      return new AbilityAction(
        assertNotNullOrUndefined(json["name"] as string),
        assertNotNullOrUndefined(json["actor"] as Actor),
        assertNotNullOrUndefined(json["sourceName"] as string),
        assertNotNullOrUndefined(json["sourceIndex"] as number),
        assertNotNullOrUndefined(json["partySize"] as number),
        (json["subactions"] as Record<string, unknown>[]).map(action => {
          return BattleActionParser.fromJSON(action);
        }) as BattleAction[],
      );
    } else {
      console.error(`AbilityAction.fromJSON called on ${json}`);
      return undefined;
    }
  }
}