import { JSX } from "react/jsx-runtime";
import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";
import { GodsightBattleData } from "./battledata";
import { StatsUpdate, StatsUpdateHelper } from "./stats";
import { BattleActionHelper } from "./battleactionhelper";
import { Actor } from "../../gbf/battletypes/scenariodata/mechanics/actor";
import { GodsightBossData } from "./bossdata";
import { GodsightPartyFormationData } from "./partyformationdata";

export class StandbyAction extends BattleAction {
  public actionType: ActionType = ActionType.STANDBY;
  public subactions: BattleAction[] = [];

  constructor(
    public actionNumber: number,
    public position: number,
    public standby: boolean,
    public bossesAtTimeOfAction: GodsightBossData[],
    public formationAtTimeOfAction: GodsightPartyFormationData,
    public battleMessage?: string,
  ) {
    super();
  }

  getStats(): StatsUpdate {
    return StatsUpdateHelper.getEmptyStatsUpdate();
  }

  getDescription(): JSX.Element {
    const baseMessage = `${BattleActionHelper.getActorName(
      this.bossesAtTimeOfAction,
      this.formationAtTimeOfAction,
      Actor.PLAYER,
      this.position,
    )} couldn't attack!`;
    let fullMessage = baseMessage;
    if (this.battleMessage) {
      fullMessage = `${this.battleMessage} ${baseMessage}`
    }

    return (
      <>
        <div className="action-description">{fullMessage}</div>
      </>
    );
  }

  static fromJSON(json: { [key: string]: any; }): StandbyAction | undefined {
    const actionType = json["actionType"];
    if (actionType == ActionType.STANDBY) {
      return new StandbyAction(
        json["actionNumber"] as number,
        json["position"] as number,
        json["standby"] as boolean,
        json["bossesAtTimeOfAction"] as GodsightBossData[],
        json["formationAtTimeOfAction"] as GodsightPartyFormationData,
        json["battleMessage"] as string | undefined,
      );
    } else {
      console.error(`StandbyAction.fromJSON called on ${json}`);
      return undefined;
    }
  }
}