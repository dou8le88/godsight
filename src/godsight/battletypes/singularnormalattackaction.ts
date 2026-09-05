import { GameElementValue } from "../../gbf/battletypes/scenariodata/mechanics/element";
import { Actor } from "../../gbf/battletypes/scenariodata/mechanics/actor";
import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";
import { DamageInstance } from "./damageinstance";
import { StatsUpdate, StatsUpdateHelper } from "./stats";

export class SingularNormalAttackAction extends BattleAction {
  public actionType: ActionType = ActionType.SINGULAR_NORMAL_ATTACK;
  public subactions: BattleAction[] = [];

  constructor(
    public actionNumber: number,
    public source: Actor,
    public attackerPosition: number,
    public element: GameElementValue,
    public damageInstances: DamageInstance[],
  ) {
    super();
  }

  getDescription(): string {
    const damage = this.damageInstances.map(d => d["value"]).join("+");

    return `${this.source} at position ${this.attackerPosition} made a normal attack, dealing ${damage} damage!`;
  }

  getStats(): StatsUpdate {
    const update = StatsUpdateHelper.getEmptyStatsUpdate();

    switch (this.source) {
      case Actor.PLAYER:
        this.damageInstances.forEach(instance => {
          if (!update["characterStats"][this.attackerPosition]) {
            update["characterStats"][this.attackerPosition] = StatsUpdateHelper.getEmptyStats();
          }
          update["generalStats"]["normalAttackDamage"][instance["element"]] += instance["value"];
          update["characterStats"][this.attackerPosition]["normalAttackDamage"][instance["element"]] += instance["value"];
          if (instance["value"] > 0) {
            update["generalStats"]["hitCount"] += 1;
            update["characterStats"][this.attackerPosition]["hitCount"] += 1;
          }
        });
        break;
      case Actor.BOSS:
        this.damageInstances.forEach(instance => {
          if (!update["characterStats"][instance["receiverPosition"]]) {
            update["characterStats"][instance["receiverPosition"]] = StatsUpdateHelper.getEmptyStats();
          }
          update["generalStats"]["damageTaken"][instance["element"]] += instance["value"];
          update["characterStats"][instance["receiverPosition"]]["damageTaken"][instance["element"]] += instance["value"];
        });
        break;
      default:
        console.error(`Unknown actor ${this.source} in SingularNormalAttackAction`)
        break;
    }

    return update;
  }

  static fromJSON(json: { [key: string]: any; }): SingularNormalAttackAction | undefined {
    const actionType = json["actionType"];
    if (actionType == ActionType.SINGULAR_NORMAL_ATTACK) {
      return new SingularNormalAttackAction(
        json["actionNumber"] as number,
        json["source"] as Actor,
        json["attackerPosition"] as number,
        json["element"] as GameElementValue,
        json["damageInstances"] as DamageInstance[],
      );
    } else {
      console.error(`SingularNormalAttackAction.fromJSON called on ${json}`);
      return undefined;
    }
  }
}