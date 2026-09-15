import { Actor } from "../../gbf/battletypes/scenariodata/mechanics/actor";
import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";
import { DamageInstance } from "./damageinstance";
import { StatsUpdate, StatsUpdateHelper } from "./stats";
import { JSX } from "react/jsx-runtime";
import { BattleActionHelper } from "./battleactionhelper";
import { assertNotNullOrUndefined } from "../../util/assert";

export class SingularNormalAttackAction extends BattleAction {
  public actionType: ActionType = ActionType.SINGULAR_NORMAL_ATTACK;
  public subactions: BattleAction[] = [];

  constructor(
    public actionNumber: number,
    public source: Actor,
    public attackerIndex: number,
    public partySize: number,
    public damageInstances: DamageInstance[],
  ) {
    super();
  }

  getDescription(): JSX.Element {
    const damageInstanceJsx = BattleActionHelper.getDamageInstanceJsx(
      this.damageInstances,
    );

    return (
      <span key={this.actionNumber}>
        {damageInstanceJsx}
      </span>
    );
  }

  getStats(): StatsUpdate {
    const update = StatsUpdateHelper.getEmptyStatsUpdate(this.partySize);

    switch (this.source) {
      case Actor.PLAYER:
        this.damageInstances.forEach(instance => {
          const attackerIndex = this.attackerIndex;
          update["generalStats"]["normalAttackDamage"][instance["element"]] += instance["value"];
          update["characterStats"][attackerIndex]["normalAttackDamage"][instance["element"]] += instance["value"];
          if (instance["value"] > 0) {
            update["generalStats"]["hitCount"] += 1;
            update["characterStats"][attackerIndex]["hitCount"] += 1;
          }
        });
        break;
      case Actor.BOSS:
        this.damageInstances.forEach(instance => {
          update["generalStats"]["damageTaken"][instance["element"]] += instance["value"];
          update["characterStats"][instance["receiverIndex"]]["damageTaken"][instance["element"]] += instance["value"];
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
        assertNotNullOrUndefined(json["actionNumber"] as number),
        assertNotNullOrUndefined(json["source"] as Actor),
        assertNotNullOrUndefined(json["attackerIndex"] as number),
        assertNotNullOrUndefined(json["partySize"] as number),
        assertNotNullOrUndefined(json["damageInstances"] as DamageInstance[]),
      );
    } else {
      console.error(`SingularNormalAttackAction.fromJSON called on ${json}`);
      return undefined;
    }
  }
}