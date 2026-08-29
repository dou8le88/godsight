import { GameElementValue } from "../../gbf/battletypes/scenariodata/mechanics/element";
import { Actor } from "../../gbf/battletypes/scenariodata/mechanics/actor";
import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";
import { DamageInstance } from "./damageinstance";
import { StatsUpdate, StatsUpdateHelper } from "./stats";

export class MultihitDamageAction implements BattleAction {
  constructor(
    public element: GameElementValue,
    public target: Actor,
    public hits: DamageInstance[],
    public totals: number[],
  ) {
  }

  getStats(): StatsUpdate {
    const update = StatsUpdateHelper.getEmptyStatsUpdate();
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
          update["generalStats"]["skillDamage"] += instance["value"];
          update["generalStats"]["hitCount"] += 1;
        });
        break;
      case Actor.PLAYER:
        // Boss "skill damage" can occur in certain raids like Macutanmacar or Esoteric Mastery Trial.
        this.hits.forEach(instance => {
          update["generalStats"]["damageTaken"] += instance["value"];
          if (!update["characterStats"][instance["receiverPosition"]]) {
            update["characterStats"][instance["receiverPosition"]] = StatsUpdateHelper.getEmptyStats();
          }
          update["characterStats"][instance["receiverPosition"]]["damageTaken"] += instance["value"];
        });
        break;
      default:
        console.error(`Unknown actor ${this.target} in MultihitDamageAction stats`);
    }
    return update;
  }
}