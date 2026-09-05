import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";
import { StatsUpdate, StatsUpdateHelper } from "./stats";

export class ReplaceCharacterAction extends BattleAction {
  public actionType: ActionType = ActionType.REPLACED_CHARACTER;
  public subactions: BattleAction[] = [];

  constructor(
    public actionNumber: number,
    public position: number,
    public newCharacter: number,
  ) {
    super();
  }

  getDescription(): string {
    return `Character at position ${this.position} was replaced with ${this.newCharacter}!`;
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
      );
    } else {
      console.error(`ReplaceCharacterAction.fromJSON called on ${json}`);
      return undefined;
    }
  }
}