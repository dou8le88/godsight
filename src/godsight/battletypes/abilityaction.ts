import { Actor } from "../../gbf/battletypes/scenariodata/mechanics/actor";
import { GameElementHelper } from "../../gbf/battletypes/scenariodata/mechanics/element";
import { BattleAction } from "./battleaction";
import { StatsUpdate, StatsUpdateHelper } from "./stats";

export class AbilityAction implements BattleAction {

  constructor(
    public name: string,
    public source: Actor,
    public position: number,
    public subactions: BattleAction[]) {
  }

  getStats(): StatsUpdate {
    const update = StatsUpdateHelper.getEmptyStatsUpdate();
    const subactionStatsUpdates = this.subactions.map(action => action.getStats());
    const allUpdates = subactionStatsUpdates.reduce(
      (prev, cur) => StatsUpdateHelper.concatUpdates(prev, cur),
      update,
    );
    switch (this.source) {
      case Actor.PLAYER:
        // The subactions have no way to associate certain general stats with
        // a specific character, so we must do it here for now. TODO: fix.
        const subactionHitCount = allUpdates["generalStats"]["hitCount"];
        const subactionDebuffs = allUpdates["generalStats"]["debuffsInflictedCount"];
        const subactionSkillDamage = allUpdates["generalStats"]["skillDamage"];

        if (!allUpdates["characterStats"][this.position]) {
          allUpdates["characterStats"][this.position] = StatsUpdateHelper.getEmptyStats();
        }
        allUpdates["characterStats"][this.position]["hitCount"] += subactionHitCount;
        allUpdates["characterStats"][this.position]["debuffsInflictedCount"] += subactionDebuffs;
        GameElementHelper.getAllElements().forEach(element => {
          allUpdates["characterStats"][this.position]["skillDamage"][element] += subactionSkillDamage[element];
        });
        break;
      case Actor.BOSS:
        // The boss used an "ability", can happen in certain raids.
        // Due to the quirks of the underlying commands, stats should be tracked correctly
        // via subactions in this case.
        break;
      default:
        console.error(`Got unknown source ${this.source} for AbilityAction`);
        break;
    }

    return allUpdates;
  }
}