import { Actor } from "../../gbf/battletypes/scenariodata/mechanics/actor";
import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";
import { DamageInstance } from "./damageinstance";
import { StatsUpdate, StatsUpdateHelper } from "./stats";
import { JSX } from "react/jsx-runtime";
import { BattleActionHelper } from "./battleactionhelper";
import { assertNotNullOrUndefined } from "../../util/assert";
import { GameElement } from "../../gbf/battletypes/scenariodata/mechanics/element";

export class DamageAction extends BattleAction {
  public actionType: ActionType = ActionType.DAMAGE_DEALT;
  public subactions: BattleAction[] = [];

  constructor(
    public actionNumber: number,
    public target: Actor,
    public partySize: number,
    public endOfTurnDamage: boolean,
    public instances: DamageInstance[],
  ) {
    super();
  }

  getDescription(): JSX.Element {
    const damageInstanceJsx = BattleActionHelper.getDamageInstanceJsx(
      this.instances,
    );

    return (
      <span key={this.actionNumber}>
        {damageInstanceJsx}
      </span>
    );
  }

  getStats(): StatsUpdate {
    const update = StatsUpdateHelper.getEmptyStatsUpdate(this.partySize);
    switch (this.target) {
      case Actor.BOSS:
        // Since other commands all seem to directly associate damage dealt with the command, the only
        // time DamageAction comes up seems to be with skill damage.
        // Currently we have no way to associate a source character with this damage and have to do it in AbilityAction. TODO: fix that.
        this.instances.forEach(instance => {
          if (this.endOfTurnDamage) {
            update["generalStats"]["dotDamage"] += instance["value"];
          } else {
            update["generalStats"]["skillDamage"][instance["element"]] += instance["value"];
            if (instance["value"] > 0) {
              update["generalStats"]["hitCount"] += 1;
            }
          }
        });
        break;
      case Actor.PLAYER:
        // Boss "skill damage" can occur in certain raids like Macutanmacar or Esoteric Mastery Trial.
        this.instances.forEach(instance => {
          update["generalStats"]["damageTaken"][instance["element"]] += instance["value"];
          update["characterStats"][instance["receiverIndex"]]["damageTaken"][instance["element"]] += instance["value"];
        });
        break;
      default:
        console.error(`Unknown actor ${this.target} in DamageAction stats`);
    }
    return update;
  }

  static override fromJSON(json: Record<string, unknown>): DamageAction | undefined {
    const actionType = json["actionType"];
    if (actionType == ActionType.DAMAGE_DEALT) {
      return new DamageAction(
        assertNotNullOrUndefined(json["actionNumber"] as number),
        assertNotNullOrUndefined(json["target"] as Actor),
        assertNotNullOrUndefined(json["partySize"] as number),
        assertNotNullOrUndefined(json["endOfTurnDamage"] as boolean),
        assertNotNullOrUndefined(json["instances"] as DamageInstance[]),
      );
    } else {
      console.error(`DamageAction.fromJSON called on ${json}`);
      return undefined;
    }
  }
}