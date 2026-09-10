import { JSX } from "react/jsx-runtime";
import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";
import { DamageInstance } from "./damageinstance";
import { StatsUpdate, StatsUpdateHelper } from "./stats";
import { BattleActionHelper } from "./battleactionhelper";
import { Actor } from "../../gbf/battletypes/scenariodata/mechanics/actor";
import { GodsightBossData } from "./bossdata";
import { GodsightPartyFormationData } from "./partyformationdata";

export class ChainBurstAction extends BattleAction {
  public actionType: ActionType = ActionType.CHAIN_BURST;
  public subactions: BattleAction[] = [];

  constructor(
    public actionNumber: number,
    public chainCount: number,
    public name: string,
    public damageInstances: DamageInstance[],
    public bossesAtTimeOfAction: GodsightBossData[],
    public formationAtTimeOfAction: GodsightPartyFormationData,
  ) {
    super();
  }

  getDescription(): JSX.Element {
    const damageInstanceJsx = BattleActionHelper.getDamageInstanceJsx(this.bossesAtTimeOfAction, this.formationAtTimeOfAction, Actor.BOSS, this.damageInstances);

    return (
      <>
        <div className="action-description" > The party activated the chain burst {this.name} !
          {damageInstanceJsx}
        </div>
      </>
    );
  }

  getStats(): StatsUpdate {
    const update = StatsUpdateHelper.getEmptyStatsUpdate();

    this.damageInstances.forEach(instance => {
      update["generalStats"]["otherDamage"][instance["element"]] += instance["value"];
      if (instance["value"] > 0) {
        update["generalStats"]["hitCount"] += 1;
      }
    });

    return update;
  }

  static fromJSON(json: { [key: string]: any; }): ChainBurstAction | undefined {
    const actionType = json["actionType"];
    if (actionType == ActionType.CHAIN_BURST) {
      return new ChainBurstAction(
        json["actionNumber"] as number,
        json["chainCount"] as number,
        json["name"] as string,
        json["damageInstances"] as DamageInstance[],
        json["bossesAtTimeOfAction"] as GodsightBossData[],
        json["formationAtTimeOfAction"] as GodsightPartyFormationData,
      );
    } else {
      console.error(`ChainBurstAction.fromJSON called on ${json}`);
      return undefined;
    }
  }
}