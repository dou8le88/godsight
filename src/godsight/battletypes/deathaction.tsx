import { JSX } from "react/jsx-runtime";
import { Actor } from "../../gbf/battletypes/scenariodata/mechanics/actor";
import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";
import { StatsUpdate, StatsUpdateHelper } from "./stats";
import { BattleActionHelper } from "./battleactionhelper";
import { GodsightBossData } from "./bossdata";
import { GodsightPartyFormationData } from "./partyformationdata";
import { assertNotNullOrUndefined, assertNotUndefined } from "../../util/assert";

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
      <div key={this.actionNumber} className="action-description">{BattleActionHelper.getActorName(
        this.bossesAtTimeOfAction,
        this.formationAtTimeOfAction,
        this.target,
        this.position,
      )} was knocked out!
      </div>
    );
  }

  getStats(): StatsUpdate {
    return StatsUpdateHelper.getEmptyStatsUpdate();
  }

  static fromJSON(json: { [key: string]: any; }): DeathAction | undefined {
    const actionType = json["actionType"];
    if (actionType == ActionType.DEATH) {
      return new DeathAction(
        assertNotNullOrUndefined(json["actionNumber"] as number),
        assertNotNullOrUndefined(json["target"] as Actor),
        assertNotNullOrUndefined(json["position"] as number),
        assertNotNullOrUndefined(json["bossesAtTimeOfAction"] as GodsightBossData[]),
        assertNotNullOrUndefined(json["formationAtTimeOfAction"] as GodsightPartyFormationData),
        assertNotUndefined(json["index"] as number | null),
      );
    } else {
      console.error(`DeathAction.fromJSON called on ${json}`);
      return undefined;
    }
  }
}