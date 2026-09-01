import { BattleAction } from "./battleaction";
import { DamageInstance } from "./damageinstance";
import { StatsUpdate, StatsUpdateHelper } from "./stats";

export class ChainBurstAction extends BattleAction {
  constructor(
    public actionNumber: number,
    public chainCount: number,
    public name: string,
    public damageInstances: DamageInstance[],
  ) {
    super();
  }

  getDescription(): string {
    const damage = this.damageInstances.map(i => i["value"]).join("+");

    return `The party activated a chain burst, ${this.name}, dealing ${damage} damage!`;
  }

  getSubactions(): BattleAction[] {
    return [];
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