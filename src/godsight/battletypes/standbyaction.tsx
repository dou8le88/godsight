import { JSX } from "react/jsx-runtime";
import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";
import { GodsightBattleData } from "./battledata";
import { StatsUpdate, StatsUpdateHelper } from "./stats";
import { BattleActionHelper } from "./battleactionhelper";
import { Actor } from "../../gbf/battletypes/scenariodata/mechanics/actor";
import { GodsightBossData } from "./bossdata";
import { GodsightPartyFormationData } from "./partyformationdata";
import { assertNotNull, assertNotNullOrUndefined, assertNotUndefined } from "../../util/assert";

export class StandbyAction extends BattleAction {
  public actionType: ActionType = ActionType.STANDBY;
  public subactions: BattleAction[] = [];

  constructor(
    public actionNumber: number,
    public position: number,
    public standby: boolean,
    public bossesAtTimeOfAction: GodsightBossData[],
    public formationAtTimeOfAction: GodsightPartyFormationData,
    public battleMessage: string | null,
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
        assertNotNullOrUndefined(json["actionNumber"] as number),
        assertNotNullOrUndefined(json["position"] as number),
        assertNotNullOrUndefined(json["standby"] as boolean),
        assertNotNullOrUndefined(json["bossesAtTimeOfAction"] as GodsightBossData[]),
        assertNotNullOrUndefined(json["formationAtTimeOfAction"] as GodsightPartyFormationData),
        assertNotUndefined(json["battleMessage"] as string | null),
      );
    } else {
      console.error(`StandbyAction.fromJSON called on ${json}`);
      return undefined;
    }
  }
}