import { Actor } from "../../gbf/battletypes/scenariodata/mechanics/actor";
import { BattleAction } from "./battleaction";
import { StatsUpdate, StatsUpdateHelper } from "./stats";
import { GodsightCondition } from "./condition";

export class ConditionChangeAction implements BattleAction {
  constructor(
    public target: Actor,
    public position: number,
    public buffs: GodsightCondition[],
    public debuffs: GodsightCondition[],
    public unclassified: GodsightCondition[],
  ) {
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
}