import { JSX } from "react/jsx-runtime";
import { Actor } from "../../gbf/battletypes/scenariodata/mechanics/actor";
import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";
import { StatsUpdate, StatsUpdateHelper } from "./stats";
import { BattleActionHelper } from "./battleactionhelper";
import { GodsightBossData } from "./bossdata";
import { GodsightPartyFormationData } from "./partyformationdata";

export class DeathAction extends BattleAction {
  public actionType: ActionType = ActionType.DEATH;
  public subactions: BattleAction[] = [];

  constructor(
    public actionNumber: number,
    public target: Actor,
    public position: number,
    public bossesAtTimeOfAction: GodsightBossData[],
    public formationAtTimeOfAction: GodsightPartyFormationData,
    public index: number | null,
  ) {
    super();
  }

  getDescription(): JSX.Element {
    return (
      <>
        <div className="action-description">{BattleActionHelper.getActorName(
          this.bossesAtTimeOfAction,
          this.formationAtTimeOfAction,
          this.target,
          this.position,
        )} was knocked out!
        </div>
      </>
    );
  }

  getStats(): StatsUpdate {
    return StatsUpdateHelper.getEmptyStatsUpdate();
  }

  static fromJSON(json: { [key: string]: any; }): DeathAction | undefined {
    const actionType = json["actionType"];
    if (actionType == ActionType.DEATH) {
      return new DeathAction(
        json["actionNumber"] as number,
        json["target"] as Actor,
        json["position"] as number,
        json["bossesAtTimeOfAction"] as GodsightBossData[],
        json["formationAtTimeOfAction"] as GodsightPartyFormationData,
        json["index"] as number | null,
      );
    } else {
      console.error(`DeathAction.fromJSON called on ${json}`);
      return undefined;
    }
  }
}