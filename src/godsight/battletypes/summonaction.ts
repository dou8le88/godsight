import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";
import { BattleActionParser } from "./battleactionparser";
import { DamageInstance } from "./damageinstance";
import { StatsUpdate, StatsUpdateHelper } from "./stats";

export class SummonAction extends BattleAction {
  public actionType: ActionType = ActionType.CALLED_SUMMON;

  constructor(
    public actionNumber: number,
    public name: string,
    public damageInstances: DamageInstance[],
    public subactions: BattleAction[],
  ) {
    super();
  }

  getSimpleDescription(): string {
    const damage = this.damageInstances.map(d => d["value"]).join("+");

    return `${this.name} was called, dealing ${damage} damage!`;
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

  static fromJSON(json: { [key: string]: any; }): SummonAction | undefined {
    const actionType = json["actionType"];
    if (actionType == ActionType.CALLED_SUMMON) {
      return new SummonAction(
        json["actionNumber"] as number,
        json["name"] as string,
        json["damageInstances"] as DamageInstance[],
        json["subactions"].map((action: any) => {
          return BattleActionParser.fromJSON(action);
        }) as BattleAction[],
      );
    } else {
      console.error(`SummonAction.fromJSON called on ${json}`);
      return undefined;
    }
  }
}