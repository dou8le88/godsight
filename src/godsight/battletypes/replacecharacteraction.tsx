import { JSX } from "react/jsx-runtime";
import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";
import { GodsightBattleData } from "./battledata";
import { StatsUpdate, StatsUpdateHelper } from "./stats";
import { GodsightPartyFormationData, PartyFormationHelper } from "./partyformationdata";

export class ReplaceCharacterAction extends BattleAction {
  public actionType: ActionType = ActionType.REPLACED_CHARACTER;
  public subactions: BattleAction[] = [];

  constructor(
    public actionNumber: number,
    public position: number,
    public newCharacter: number,
    public formationAtTimeOfAction: GodsightPartyFormationData,
  ) {
    super();
  }

  getDescription(): JSX.Element {

    return (
      <>
        <div className="action-description">{PartyFormationHelper.getNameOfCharacterInPosition(
          this.formationAtTimeOfAction,
          this.position,
        )} was replaced by {PartyFormationHelper.getNameOfCharacterAtPartyIndex(
          this.formationAtTimeOfAction,
          this.newCharacter,
        )}!
        </div>
      </>
    );
  }

  getStats(): StatsUpdate {
    return StatsUpdateHelper.getEmptyStatsUpdate();
  }

  static fromJSON(json: { [key: string]: any; }): ReplaceCharacterAction | undefined {
    const actionType = json["actionType"];
    if (actionType == ActionType.REPLACED_CHARACTER) {
      return new ReplaceCharacterAction(
        json["actionNumber"] as number,
        json["position"] as number,
        json["newCharacter"] as number,
        json["formationAtTimeOfAction"] as GodsightPartyFormationData,
      );
    } else {
      console.error(`ReplaceCharacterAction.fromJSON called on ${json}`);
      return undefined;
    }
  }
}