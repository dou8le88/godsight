import { Actor } from "../../gbf/battletypes/scenariodata/mechanics/actor";
import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";
import { DamageInstance } from "./damageinstance";
import { StatsUpdate, StatsUpdateHelper } from "./stats";
import { JSX } from "react/jsx-runtime";
import { BattleActionHelper } from "./battleactionhelper";
import { assertNotNullOrUndefined } from "../../util/assert";
import { DamageDisplay } from "../settings/godsightsettings";

export class MultihitDamageAction extends BattleAction {
  public actionType: ActionType = ActionType.DAMAGE_DEALT_MULTIHIT;
  public subactions: BattleAction[] = [];

  constructor(
    public target: Actor,
    public partySize: number,
    public beforeBossTurn: boolean,
    public hits: DamageInstance[],
  ) {
    super();
  }

  getDescription(key: number, damageDisplay: DamageDisplay): JSX.Element {
    const damageInstanceJsx = BattleActionHelper.getDamageInstanceJsx(
      this.hits,
      damageDisplay,
    );

    return (
      <span key={key}>
        {damageInstanceJsx}
      </span>
    );
  }

  getStats(): StatsUpdate {
    const update = StatsUpdateHelper.getEmptyStatsUpdate(this.partySize);
    switch (this.target) {
      case Actor.BOSS:
        // Since other commands all seem to directly associate damage dealt with the command, the only
        // time MultihitDamageAction comes up seems to be with skill damage.
        // Currently we have no way to associate a source character with this damage and have to do it in AbilityAction.
        this.hits.forEach(instance => {
          // Boss-targeted DamageActions are always skill damage *ONLY BECAUSE*
          // other damage types directly associate their damage with their commands.
          // Chain Bursts appear to be the only exception, but we handle those commands specially
          // so we never end up with a DamageAction for a chain burst damage instance.
          update["generalStats"]["skillDamage"][instance["element"]] += instance["value"];
          if (this.beforeBossTurn) {
            update["beforeBossTurnStats"]["skillDamage"][instance["element"]] += instance["value"];
          }
          if (instance["value"] > 0) {
            update["generalStats"]["hitCount"] += 1;
            if (this.beforeBossTurn) {
              update["beforeBossTurnStats"]["hitCount"] += 1;
            }
          }
        });
        break;
      case Actor.PLAYER:
        // Boss "skill damage" can occur in certain raids like Macutanmacar or Esoteric Mastery Trial.
        this.hits.forEach(instance => {
          update["generalStats"]["damageTaken"][instance["element"]] += instance["value"];
          if (this.beforeBossTurn) {
            update["beforeBossTurnStats"]["damageTaken"][instance["element"]] += instance["value"];
          }
          update["characterStats"][instance["receiverIndex"]]["damageTaken"][instance["element"]] += instance["value"];
        });
        break;
      default:
        console.error(`Unknown actor ${this.target} in MultihitDamageAction stats`);
    }
    return update;
  }

  static override fromJSON(json: Record<string, unknown>): MultihitDamageAction | undefined {
    const actionType = json["actionType"];
    if (actionType == ActionType.DAMAGE_DEALT_MULTIHIT) {
      return new MultihitDamageAction(
        assertNotNullOrUndefined(json["target"] as Actor),
        assertNotNullOrUndefined(json["partySize"] as number),
        assertNotNullOrUndefined(json["beforeBossTurn"] as boolean),
        assertNotNullOrUndefined(json["hits"] as DamageInstance[]),
      );
    } else {
      console.error(`MultihitDamageAction.fromJSON called on ${json}`);
      return undefined;
    }
  }
}