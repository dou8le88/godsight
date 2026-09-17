import { JSX } from "react/jsx-runtime";
import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";
import { StatsUpdate, StatsUpdateHelper } from "./stats";
import { assertNotNullOrUndefined } from "../../util/assert";

export class ReplaceCharacterAction extends BattleAction {
  public actionType: ActionType = ActionType.REPLACED_CHARACTER;
  public subactions: BattleAction[] = [];

  constructor(
    public characterName: string,
    public replacementCharacterName: string,
  ) {
    super();
  }

  getDescription(key: number): JSX.Element {

    return (
      <div key={key} className="action-description">{this.characterName} was replaced by {
        this.replacementCharacterName
      }!
      </div>
    );
  }

  getStats(): StatsUpdate {
    return StatsUpdateHelper.getEmptyStatsUpdate();
  }

  static override fromJSON(json: Record<string, unknown>): ReplaceCharacterAction | undefined {
    const actionType = json["actionType"];
    if (actionType == ActionType.REPLACED_CHARACTER) {
      return new ReplaceCharacterAction(
        assertNotNullOrUndefined(json["characterName"] as string),
        assertNotNullOrUndefined(json["replacementCharacterName"] as string),
      );
    } else {
      console.error(`ReplaceCharacterAction.fromJSON called on ${json}`);
      return undefined;
    }
  }
}