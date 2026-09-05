import { Actor } from "../../gbf/battletypes/scenariodata/mechanics/actor";
import { BattleAction } from "./battleaction";
import { StatsUpdate, StatsUpdateHelper } from "./stats";
import { GodsightCondition } from "./condition";
import { ActionType } from "./actiontype";

export class ConditionChangeAction extends BattleAction {
  public actionType: ActionType = ActionType.CONDITION_CHANGED;
  public subactions: BattleAction[] = [];

  constructor(
    public actionNumber: number,
    public target: Actor,
    public position: number,
    public missCount: number,
    public buffs: GodsightCondition[],
    public debuffs: GodsightCondition[],
    public unclassified: GodsightCondition[],
  ) {
    super();
  }

  getDescription(): string {
    return `${this.target} at position ${this.position} gained ${this.buffs.length} buffs, ${this.debuffs.length} debuffs, and ${this.unclassified.length} unclassified statuses!`;
  }

  getStats(): StatsUpdate {
    const update = StatsUpdateHelper.getEmptyStatsUpdate();
    if (this.target == Actor.BOSS) {
      update["generalStats"]["debuffsInflictedCount"] += this.debuffs.length;
      // TODO: figure out a way of associating the debuffs with a specific character.
      // May not be consistently possible.
      return update;
    } else {
      return update;
    }
  }

  static fromJSON(json: { [key: string]: any; }): ConditionChangeAction | undefined {
    const actionType = json["actionType"];
    if (actionType == ActionType.CONDITION_CHANGED) {
      return new ConditionChangeAction(
        json["actionNumber"] as number,
        json["target"] as Actor,
        json["position"] as number,
        json["missCount"] as number,
        json["buffs"] as GodsightCondition[],
        json["debuffs"] as GodsightCondition[],
        json["unclassified"] as GodsightCondition[],
      );
    } else {
      console.error(`ConditionChangeAction.fromJSON called on ${json}`);
      return undefined;
    }
  }
}