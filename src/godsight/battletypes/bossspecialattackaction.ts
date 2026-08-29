import { GameElementValue } from "../../gbf/battletypes/scenariodata/mechanics/element"
import { Actor } from "../../gbf/battletypes/scenariodata/mechanics/actor"
import { ActionType } from "./actiontype"
import { BattleAction } from "./battleaction"
import { DamageInstance } from "./damageinstance"
import { StatsUpdate, StatsUpdateHelper } from "./stats"

export class BossSpecialAttackAction implements BattleAction {

  constructor(
    public attackName: string,
    public sourceName: string,
    public target: Actor,
    public count: number,
    public element: GameElementValue,
    public damageInstances: DamageInstance[],
    public subactions: BattleAction[]
  ) {
  }

  getStats(): StatsUpdate {
    const update = StatsUpdateHelper.getEmptyStatsUpdate();
    if (this.target == Actor.PLAYER) {
      this.damageInstances.forEach(instance => {
        const damage = instance["value"];
        update["generalStats"]["damageTaken"] += damage;
        if (!update["characterStats"][instance["receiverPosition"]]) {
          update["characterStats"][instance["receiverPosition"]] = StatsUpdateHelper.getEmptyStats();
        }
        update["characterStats"][instance["receiverPosition"]]["damageTaken"] += damage;
      });
      const subactionStatsUpdates = this.subactions.map(action => action.getStats());
      return subactionStatsUpdates.reduce(
        (prev, cur) => StatsUpdateHelper.concatUpdates(prev, cur),
        update
      );
    } else {
      console.error(`Got ${this.target} target for BossSpecialAttackAction`);
      return update;
    }
  }
}
