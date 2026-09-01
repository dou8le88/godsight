import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";
import { DamageInstance } from "./damageinstance";
import { StatsUpdate, StatsUpdateHelper } from "./stats";

export class SummonAction extends BattleAction {
  constructor(
    public actionNumber: number,
    public name: string,
    public damageInstances: DamageInstance[],
    public subactions: BattleAction[],
  ) {
    super();
  }

  getDescription(): string {
    const damage = this.damageInstances.map(d => d["value"]).join("+");

    return `${name} was called, dealing ${damage} damage!`;
  }

  getSubactions(): BattleAction[] {
    return this.subactions;
  }

  getStats(): StatsUpdate {
    const update = StatsUpdateHelper.getEmptyStatsUpdate();

    this.damageInstances.forEach(instance => {
      update["generalStats"]["otherDamage"][instance["element"]] += instance["value"];
    });

    const subactionUpdates = this.subactions.map(action => action.getStats());

    return subactionUpdates.reduce(
      (prev, cur) => StatsUpdateHelper.concatUpdates(prev, cur),
      update
    );
  }
}