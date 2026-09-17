import { Actor } from "../../gbf/battletypes/scenariodata/mechanics/actor";
import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";
import { DamageInstance } from "./damageinstance";
import { StatsUpdate, StatsUpdateHelper } from "./stats";
import { BattleActionParser } from "./battleactionparser";
import { JSX } from "react/jsx-runtime";
import { BattleActionHelper } from "./battleactionhelper";
import { assertNotNullOrUndefined } from "../../util/assert";

export class ChargedAttackAction extends BattleAction {
  public actionType: ActionType = ActionType.CHARGED_ATTACK;

  constructor(
    public name: string,
    public attackerIndex: number,
    public attackerName: string,
    public target: Actor,
    public partySize: number,
    public damageTotals: DamageInstance[],
    public subactions: BattleAction[],
  ) {
    super();
  }

  getDescription(key: number): JSX.Element {
    const damageInstanceJsx = BattleActionHelper.getDamageInstanceJsx(
      this.damageTotals,
    );

    return (
      <div key={key} className="action-description">{this.attackerName} activated their charged attack, {this.name}!
        {damageInstanceJsx}
        {
          this.subactions.map((subaction, idx) => (
            subaction.getDescription(idx)
          ))
        }
      </div>
    );
  }

  getStats(): StatsUpdate {
    const update = StatsUpdateHelper.getEmptyStatsUpdate(this.partySize);
    if (this.target == Actor.BOSS) {
      this.damageTotals.forEach(instance => {
        update["generalStats"]["chargedAttackDamage"][instance["element"]] += instance["value"];
        update["characterStats"][this.attackerIndex]["chargedAttackDamage"][instance["element"]] += instance["value"];
        if (instance["value"] > 0) {
          update["generalStats"]["hitCount"] += 1;
          update["characterStats"][this.attackerIndex]["hitCount"] += 1;
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

  static override fromJSON(json: Record<string, unknown>): ChargedAttackAction | undefined {
    const actionType = json["actionType"];
    if (actionType == ActionType.CHARGED_ATTACK) {
      return new ChargedAttackAction(
        assertNotNullOrUndefined(json["name"] as string),
        assertNotNullOrUndefined(json["attackerIndex"] as number),
        assertNotNullOrUndefined(json["attackerName"] as string),
        assertNotNullOrUndefined(json["target"] as Actor),
        assertNotNullOrUndefined(json["partySize"] as number),
        assertNotNullOrUndefined(json["damageTotals"] as DamageInstance[]),
        (json["subactions"] as Record<string, unknown>[]).map(action => {
          return BattleActionParser.fromJSON(action);
        }) as BattleAction[],
      );
    } else {
      console.error(`ChargedAttackAction.fromJSON called on ${json}`);
      return undefined;
    }
  }
}