import { JSX } from "react/jsx-runtime";
import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";
import { DamageInstance } from "./damageinstance";
import { StatsUpdate, StatsUpdateHelper } from "./stats";
import { BattleActionHelper } from "./battleactionhelper";
import { assertNotNullOrUndefined } from "../../util/assert";

export class ChainBurstAction extends BattleAction {
  public actionType: ActionType = ActionType.CHAIN_BURST;
  public subactions: BattleAction[] = [];

  constructor(
    public actionNumber: number,
    public chainCount: number,
    public name: string,
    public partySize: number,
    public damageInstances: DamageInstance[],
  ) {
    super();
  }

  getDescription(): JSX.Element {
    const damageInstanceJsx = BattleActionHelper.getDamageInstanceJsx(this.damageInstances);

    return (
      <div key={this.actionNumber} className="action-description" > The party activated the chain burst {this.name}!
        {damageInstanceJsx}
      </div>
    );
  }

  getStats(): StatsUpdate {
    const update = StatsUpdateHelper.getEmptyStatsUpdate(this.partySize);

    this.damageInstances.forEach(instance => {
      update["generalStats"]["otherDamage"][instance["element"]] += instance["value"];
      // Chain burst is considered "MC's" damage by the game.
      update["characterStats"][0]["otherDamage"][instance["element"]] += instance["value"];
      if (instance["value"] > 0) {
        update["generalStats"]["hitCount"] += 1;
        update["characterStats"][0]["hitCount"] += 1;
      }
    });

    return update;
  }

  static fromJSON(json: { [key: string]: any; }): ChainBurstAction | undefined {
    const actionType = json["actionType"];
    if (actionType == ActionType.CHAIN_BURST) {
      return new ChainBurstAction(
        assertNotNullOrUndefined(json["actionNumber"] as number),
        assertNotNullOrUndefined(json["chainCount"] as number),
        assertNotNullOrUndefined(json["name"] as string),
        assertNotNullOrUndefined(json["partySize"] as number),
        assertNotNullOrUndefined(json["damageInstances"] as DamageInstance[]),
      );
    } else {
      console.error(`ChainBurstAction.fromJSON called on ${json}`);
      return undefined;
    }
  }
}