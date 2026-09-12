import { JSX } from "react/jsx-runtime";
import { Actor } from "../../gbf/battletypes/scenariodata/mechanics/actor";
import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";
import { HealingInstance } from "./healinginstance";
import { StatsUpdate, StatsUpdateHelper } from "./stats";
import { BattleActionHelper } from "./battleactionhelper";
import { GodsightBossData } from "./bossdata";
import { GodsightPartyFormationData } from "./partyformationdata";
import { assertNotNullOrUndefined } from "../../util/assert";

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
      <span key={this.actionNumber}>
        {healingJsx}
      </span>
    );
  }

  getStats(): StatsUpdate {
    const update = StatsUpdateHelper.getEmptyStatsUpdate(Object.keys(this.formationAtTimeOfAction["members"]));

    // Bosses can heal as well but we do not currently track that.
    if (this.target == Actor.PLAYER) {
      this.healingInstances.forEach(instance => {
        const receiverIndex = BattleActionHelper.getCharacterIndexAtPosition(
          this.formationAtTimeOfAction,
          instance["receiverPosition"],
        );
        update["generalStats"]["healingReceived"] += instance["value"];
        update["characterStats"][receiverIndex]["healingReceived"] += instance["value"];
      });
    }

    return update;
  }

  static fromJSON(json: { [key: string]: any; }): HealingAction | undefined {
    const actionType = json["actionType"];
    if (actionType == ActionType.HEAL) {
      return new HealingAction(
        assertNotNullOrUndefined(json["actionNumber"] as number),
        assertNotNullOrUndefined(json["target"] as Actor),
        assertNotNullOrUndefined(json["healingInstances"] as HealingInstance[]),
        assertNotNullOrUndefined(json["bossesAtTimeOfAction"] as GodsightBossData[]),
        assertNotNullOrUndefined(json["formationAtTimeOfAction"] as GodsightPartyFormationData),
      );
    } else {
      console.error(`HealingAction.fromJSON called on ${json}`);
      return undefined;
    }
  }
}