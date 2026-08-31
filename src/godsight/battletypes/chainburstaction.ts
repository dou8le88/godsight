import { BattleAction } from "./battleaction";
import { DamageInstance } from "./damageinstance";
import { StatsUpdate, StatsUpdateHelper } from "./stats";

export class ChainBurstAction implements BattleAction {
  constructor(
    public chainCount: number,
    public name: string,
    public damageInstances: DamageInstance[],
  ) {
  }

  getStats(): StatsUpdate {
    const update = StatsUpdateHelper.getEmptyStatsUpdate();

    this.damageInstances.forEach(instance => {
      update["generalStats"]["otherDamage"][instance["element"]] += instance["value"];
    });
    update["generalStats"]["hitCount"] += this.damageInstances.length;

    return update;
  }
}