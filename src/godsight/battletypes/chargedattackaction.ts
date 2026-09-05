import { GameElementValue } from "../../gbf/battletypes/scenariodata/mechanics/element";
import { Actor } from "../../gbf/battletypes/scenariodata/mechanics/actor";
import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";
import { DamageInstance } from "./damageinstance";
import { StatsUpdate, StatsUpdateHelper } from "./stats";
import { BattleActionParser } from "./battleactionparser";

export class ChargedAttackAction extends BattleAction {
  public actionType: ActionType = ActionType.CHARGED_ATTACK;

  constructor(
    public actionNumber: number,
    public name: string,
    public attackerPosition: number,
    public targetPosition: number,
    public target: Actor,
    public element: GameElementValue, // TODO: remove deceptive elements on root since damage instances have their element given?
    public damageTotals: DamageInstance[],
    public subactions: BattleAction[],
  ) {
    super();
  }

  getDescription(): string {
    const damage = this.damageTotals.map(d => d["value"]).join("+");

    return `${this.attackerPosition} made a charged attack against ${this.target} at position ${this.targetPosition}, and dealt ${damage} damage!`;
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
        if (instance["value"] > 0) {
          update["characterStats"][this.attackerPosition]["hitCount"] += 1;
        }
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

  static fromJSON(json: { [key: string]: any; }): ChargedAttackAction | undefined {
    const actionType = json["actionType"];
    if (actionType == ActionType.CHARGED_ATTACK) {
      return new ChargedAttackAction(
        json["actionNumber"] as number,
        json["name"] as string,
        json["attackerPosition"] as number,
        json["targetPosition"] as number,
        json["target"] as Actor,
        json["element"] as GameElementValue,
        json["damageTotals"] as DamageInstance[],
        json["subactions"].map((action: any) => {
          return BattleActionParser.fromJSON(action);
        }) as BattleAction[],
      );
    } else {
      console.error(`ChargedAttackAction.fromJSON called on ${json}`);
      return undefined;
    }
  }
}