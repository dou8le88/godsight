import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";
import { DamageInstance } from "./damageinstance";
import { StatsUpdate, StatsUpdateHelper } from "./stats";

export class ChainBurstAction extends BattleAction {
  public actionType: ActionType = ActionType.CHAIN_BURST;
  public subactions: BattleAction[] = [];

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

  getStats(): StatsUpdate {
    const update = StatsUpdateHelper.getEmptyStatsUpdate();

    this.damageInstances.forEach(instance => {
      update["generalStats"]["otherDamage"][instance["element"]] += instance["value"];
      if (instance["value"] > 0) {
        update["generalStats"]["hitCount"] += 1;
      }
    });

    return update;
  }

  static fromJSON(json: { [key: string]: any; }): ChainBurstAction | undefined {
    const actionType = json["actionType"];
    if (actionType == ActionType.CHAIN_BURST) {
      return new ChainBurstAction(
        json["actionNumber"] as number,
        json["chainCount"] as number,
        json["name"] as string,
        json["damageInstances"] as DamageInstance[],
      );
    } else {
      console.error(`ChainBurstAction.fromJSON called on ${json}`);
      return undefined;
    }
  }
}