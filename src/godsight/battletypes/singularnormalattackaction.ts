import { GameElementValue } from "../../gbf/battletypes/scenariodata/mechanics/element";
import { Actor } from "../../gbf/battletypes/scenariodata/mechanics/actor";
import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";
import { DamageInstance } from "./damageinstance";
import { StatsUpdate, StatsUpdateHelper } from "./stats";

export class SingularNormalAttackAction implements BattleAction {
  constructor(
    public source: Actor,
    public attackerPosition: number,
    public element: GameElementValue,
    public damageInstances: DamageInstance[],
  ) {
  }

  getStats(): StatsUpdate {
    const update = StatsUpdateHelper.getEmptyStatsUpdate();

    switch (this.source) {
      case Actor.PLAYER:
        this.damageInstances.forEach(instance => {
          if (!update["characterStats"][this.attackerPosition]) {
            update["characterStats"][this.attackerPosition] = StatsUpdateHelper.getEmptyStats();
          }
          update["generalStats"]["normalAttackDamage"] += instance["value"];
          update["characterStats"][this.attackerPosition]["normalAttackDamage"] += instance["value"];
          update["generalStats"]["hitCount"] += 1;
          update["characterStats"][this.attackerPosition]["hitCount"] += 1;
        });
        break;
      case Actor.BOSS:
        this.damageInstances.forEach(instance => {
          if (!update["characterStats"][this.targetPosition]) {
            update["characterStats"][this.targetPosition] = StatsUpdateHelper.getEmptyStats();
          }
          update["generalStats"]["damageTaken"] += instance["value"];
          update["characterStats"][this.targetPosition]["damageTaken"] += instance["value"];
        });
        break;
      default:
        console.error(`Unknown actor ${this.source} in SingularNormalAttackAction`)
        break;
    }

    return update;
  }
}