import { JSX } from "react/jsx-runtime";
import { Actor } from "../../gbf/battletypes/scenariodata/mechanics/actor";
import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";
import { HealingInstance } from "./healinginstance";
import { StatsUpdate, StatsUpdateHelper } from "./stats";
import { BattleActionHelper } from "./battleactionhelper";
import { GodsightBossData } from "./bossdata";
import { GodsightPartyFormationData } from "./partyformationdata";

export class HealingAction extends BattleAction {
  public actionType: ActionType = ActionType.HEAL;
  public subactions: BattleAction[] = [];

  constructor(
    public actionNumber: number,
    public target: Actor,
    public healingInstances: HealingInstance[],
    public bossesAtTimeOfAction: GodsightBossData[],
    public formationAtTimeOfAction: GodsightPartyFormationData,
  ) {
    super();
  }

  getDescription(): JSX.Element {
    const healingJsx = BattleActionHelper.getHealingInstanceJsx(
      this.bossesAtTimeOfAction,
      this.formationAtTimeOfAction,
      this.target,
      this.healingInstances,
    );

    return (
      healingJsx
    );
  }

  getStats(): StatsUpdate {
    const update = StatsUpdateHelper.getEmptyStatsUpdate();

    // Bosses can heal as well but we do not currently track that.
    if (this.target == Actor.PLAYER) {
      this.healingInstances.forEach(instance => {
        if (!update["characterStats"][instance["receiverPosition"]]) {
          update["characterStats"][instance["receiverPosition"]] = StatsUpdateHelper.getEmptyStats();
        }
        update["generalStats"]["healingReceived"] += instance["value"];
        update["characterStats"][instance["receiverPosition"]]["healingReceived"] += instance["value"];
      });
    }

    return update;
  }

  static fromJSON(json: { [key: string]: any; }): HealingAction | undefined {
    const actionType = json["actionType"];
    if (actionType == ActionType.HEAL) {
      return new HealingAction(
        json["actionNumber"] as number,
        json["target"] as Actor,
        json["healingInstances"] as HealingInstance[],
        json["bossesAtTimeOfAction"] as GodsightBossData[],
        json["formationAtTimeOfAction"] as GodsightPartyFormationData,
      );
    } else {
      console.error(`HealingAction.fromJSON called on ${json}`);
      return undefined;
    }
  }
}