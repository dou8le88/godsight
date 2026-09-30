import { Actor } from "../../gbf/battletypes/scenariodata/mechanics/actor"
import { ActionType } from "./actiontype"
import { BattleAction } from "./battleaction"
import { DamageInstance } from "./damageinstance"
import { StatsUpdate, StatsUpdateHelper } from "./stats"
import { BattleActionParser } from "./battleactionparser"
import { JSX } from "react/jsx-runtime"
import { BattleActionHelper } from "./battleactionhelper"
import { assertNotNullOrUndefined } from "../../util/assert"
import { DamageDisplay } from "../settings/godsightsettings"

export class BossSpecialAttackAction extends BattleAction {
  public actionType: ActionType = ActionType.BOSS_SPECIAL_ATTACK;

  constructor(
    public attackName: string,
    public sourceName: string,
    public target: Actor,
    public partySize: number,
    public beforeBossTurn: boolean,
    public damageInstances: DamageInstance[],
    public subactions: BattleAction[],
  ) {
    super();
  }

  getDescription(key: number, damageDisplay: DamageDisplay): JSX.Element {
    let damageInstanceJsx = <></>;
    if (this.damageInstances.length) {
      damageInstanceJsx = BattleActionHelper.getDamageInstanceJsx(
        this.damageInstances,
        damageDisplay,
      );
    }

    return (
      <div key={key} className="action-description">{this.sourceName} activated {this.attackName}!
        {damageInstanceJsx}
        {this.subactions.map((subaction, idx) => (
          subaction.getDescription(idx, damageDisplay)
        ))}
      </div>
    );
  }

  getStats(): StatsUpdate {
    const update = StatsUpdateHelper.getEmptyStatsUpdate(this.partySize);
    this.damageInstances.forEach(instance => {
      // Bosses can target themselves (e.g., with self-buff or stance-changey kinds of specials),
      // so ignore effects for the purposes of stats if they aren't targeting a player.
      if (this.target == Actor.PLAYER) {
        const damage = instance["value"];
        update["generalStats"]["damageTaken"][instance["element"]] += damage;
        if (this.beforeBossTurn) {
          update["beforeBossTurnStats"]["damageTaken"][instance["element"]] += damage;
        }
        update["characterStats"][instance["receiverIndex"]]["damageTaken"][instance["element"]] += damage;
      }
    });
    const subactionStatsUpdates = this.subactions.map(action => action.getStats());
    return subactionStatsUpdates.reduce(
      (prev, cur) => StatsUpdateHelper.concatUpdates(prev, cur),
      update
    );
  }

  static override fromJSON(json: Record<string, unknown>): BossSpecialAttackAction | undefined {
    const actionType = json["actionType"];
    if (actionType == ActionType.BOSS_SPECIAL_ATTACK) {
      return new BossSpecialAttackAction(
        assertNotNullOrUndefined(json["attackName"] as string),
        assertNotNullOrUndefined(json["sourceName"] as string),
        assertNotNullOrUndefined(json["target"] as Actor),
        assertNotNullOrUndefined(json["partySize"] as number),
        assertNotNullOrUndefined(json["beforeBossTurn"] as boolean),
        assertNotNullOrUndefined(json["damageInstances"] as DamageInstance[]),
        (json["subactions"] as Record<string, unknown>[]).map(action => {
          return BattleActionParser.fromJSON(action);
        }) as BattleAction[],
      );
    } else {
      console.error(`BossSpecialAttackAction.fromJSON called on ${json}`);
      return undefined;
    }
  }
}
