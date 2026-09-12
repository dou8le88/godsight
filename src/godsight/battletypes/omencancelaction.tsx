import { JSX } from "react/jsx-runtime";
import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";
import { StatsUpdate, StatsUpdateHelper } from "./stats";
import { BattleActionHelper } from "./battleactionhelper";
import { Actor } from "../../gbf/battletypes/scenariodata/mechanics/actor";
import { GodsightBossData } from "./bossdata";
import { GodsightPartyFormationData } from "./partyformationdata";
import { assertNotNullOrUndefined } from "../../util/assert";

export class OmenCancelAction extends BattleAction {
  public actionType: ActionType = ActionType.OMEN_CANCELLED;
  public subactions: BattleAction[] = [];

  constructor(
    public actionNumber: number,
    public canceledBossPosition: number,
    public bossesAtTimeOfAction: GodsightBossData[],
    public formationAtTimeOfAction: GodsightPartyFormationData,
  ) {
    super();
  }

  getStats(): StatsUpdate {
    return StatsUpdateHelper.getEmptyStatsUpdate();
  }

  getDescription(): JSX.Element {
    return (
      <div key={this.actionNumber} className="action-description">{BattleActionHelper.getActorName(
        this.bossesAtTimeOfAction,
        this.formationAtTimeOfAction,
        Actor.BOSS,
        this.canceledBossPosition,
      )}'s omen was canceled!
      </div>
    )
  }

  static fromJSON(json: { [key: string]: any; }): OmenCancelAction | undefined {
    const actionType = json["actionType"];
    if (actionType == ActionType.OMEN_CANCELLED) {
      return new OmenCancelAction(
        assertNotNullOrUndefined(json["actionNumber"] as number),
        assertNotNullOrUndefined(json["canceledBossPosition"] as number),
        assertNotNullOrUndefined(json["bossesAtTimeOfAction"] as GodsightBossData[]),
        assertNotNullOrUndefined(json["formationAtTimeOfAction"] as GodsightPartyFormationData),
      );
    } else {
      console.error(`OmenCancelAction.fromJSON called on ${json}`);
      return undefined;
    }
  }
}