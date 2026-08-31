import { GameElementValue } from "../../gbf/battletypes/scenariodata/mechanics/element";
import { Actor } from "../../gbf/battletypes/scenariodata/mechanics/actor";
import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";
import { DamageInstance } from "./damageinstance";
import { StatsUpdate, StatsUpdateHelper } from "./stats";

export class ChargedAttackAction implements BattleAction {
  constructor(
    public name: string,
    public attackerPosition: number,
    public targetPosition: number,
    public target: Actor,
    public element: GameElementValue, // TODO: remove deceptive elements on root since damage instances have their element given?
    public damageTotals: DamageInstance[],
    public subactions: BattleAction[],
  ) {
  }

  getStats(): StatsUpdate {
    const update = StatsUpdateHelper.getEmptyStatsUpdate();
    if (this.target == Actor.BOSS) {
      this.damageTotals.forEach(instance => {
        update["generalStats"]["chargedAttackDamage"][instance["element"]] += instance["value"];
        if (!update["characterStats"][this.attackerPosition]) {
          update["characterStats"][this.attackerPosition] = StatsUpdateHelper.getEmptyStats();
        }
        update["characterStats"][this.attackerPosition]["chargedAttackDamage"][instance["element"]] += instance["value"];
        update["characterStats"][this.attackerPosition]["hitCount"] += 1;
      });
      const subactionStatsUpdates = this.subactions.map(action => action.getStats());
      return subactionStatsUpdates.reduce(
        (prev, cur) => StatsUpdateHelper.concatUpdates(prev, cur),
        update
      );
    } else {
      console.error(`Got ${this.target} target for ChargedAttackAction`);
      return update;
    }

  }
}