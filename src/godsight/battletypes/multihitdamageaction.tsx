import { GameElementValue } from "../../gbf/battletypes/scenariodata/mechanics/element";
import { Actor } from "../../gbf/battletypes/scenariodata/mechanics/actor";
import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";
import { DamageInstance } from "./damageinstance";
import { StatsUpdate, StatsUpdateHelper } from "./stats";
import { JSX } from "react/jsx-runtime";
import { BattleActionHelper } from "./battleactionhelper";
import { GodsightBossData } from "./bossdata";
import { GodsightPartyFormationData } from "./partyformationdata";
import { assertNotNullOrUndefined } from "../../util/assert";

export class MultihitDamageAction extends BattleAction {
  public actionType: ActionType = ActionType.DAMAGE_DEALT_MULTIHIT;
  public subactions: BattleAction[] = [];

  constructor(
    public actionNumber: number,
    public target: Actor,
    public hits: DamageInstance[],
    public bossesAtTimeOfAction: GodsightBossData[],
    public formationAtTimeOfAction: GodsightPartyFormationData,
  ) {
    super();
  }

  getDescription(): JSX.Element {
    const damageInstanceJsx = BattleActionHelper.getDamageInstanceJsx(
      this.bossesAtTimeOfAction,
      this.formationAtTimeOfAction,
      this.target,
      this.hits,
    );

    return (
      <span key={this.actionNumber}>
        {damageInstanceJsx}
      </span>
    );
  }

  getStats(): StatsUpdate {
    const update = StatsUpdateHelper.getEmptyStatsUpdate(Object.keys(this.formationAtTimeOfAction["members"]));
    switch (this.target) {
      case Actor.BOSS:
        // Since other commands all seem to directly associate damage dealt with the command, the only
        // time MultihitDamageAction comes up seems to be with skill damage.
        // Currently we have no way to associate a source character with this damage and have to do it in AbilityAction. TODO: fix that.
        this.hits.forEach(instance => {
          // Boss-targeted DamageActions are always skill damage *ONLY BECAUSE*
          // other damage types directly associate their damage with their commands.
          // Chain Bursts appear to be the only exception, but we handle those commands specially
          // so we never end up with a DamageAction for a chain burst damage instance.
          update["generalStats"]["skillDamage"][instance["element"]] += instance["value"];
          if (instance["value"] > 0) {
            update["generalStats"]["hitCount"] += 1;
          }
        });
        break;
      case Actor.PLAYER:
        // Boss "skill damage" can occur in certain raids like Macutanmacar or Esoteric Mastery Trial.
        this.hits.forEach(instance => {
          update["generalStats"]["damageTaken"][instance["element"]] += instance["value"];
          const receiverIndex = BattleActionHelper.getCharacterIndexAtPosition(
            this.formationAtTimeOfAction,
            instance["receiverPosition"],
          );
          update["characterStats"][receiverIndex]["damageTaken"][instance["element"]] += instance["value"];
        });
        break;
      default:
        console.error(`Unknown actor ${this.target} in MultihitDamageAction stats`);
    }
    return update;
  }

  static fromJSON(json: { [key: string]: any; }): MultihitDamageAction | undefined {
    const actionType = json["actionType"];
    if (actionType == ActionType.DAMAGE_DEALT_MULTIHIT) {
      return new MultihitDamageAction(
        assertNotNullOrUndefined(json["actionNumber"] as number),
        assertNotNullOrUndefined(json["target"] as Actor),
        assertNotNullOrUndefined(json["hits"] as DamageInstance[]),
        assertNotNullOrUndefined(json["bossesAtTimeOfAction"] as GodsightBossData[]),
        assertNotNullOrUndefined(json["formationAtTimeOfAction"] as GodsightPartyFormationData),
      );
    } else {
      console.error(`MultihitDamageAction.fromJSON called on ${json}`);
      return undefined;
    }
  }
}