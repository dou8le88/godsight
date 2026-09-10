import { JSX } from "react/jsx-runtime";
import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";
import { BattleActionParser } from "./battleactionparser";
import { StatsUpdate, StatsUpdateHelper } from "./stats";

export class FullElixirAction extends BattleAction {
  public actionType: ActionType = ActionType.USED_FULL_ELIXIR;

  constructor(
    public actionNumber: number,
    public subactions: BattleAction[],
  ) {
    super();
  }

  getDescription(): JSX.Element {
    return (
      <>
        <div className="action-description">The party used a Full Elixir!
          {
            this.subactions.map(subaction => (
              subaction.getDescription()
            ))
          }
        </div>
      </>
    );
  }

  getStats(): StatsUpdate {
    const update = StatsUpdateHelper.getEmptyStatsUpdate();
    const subactionUpdates = this.subactions.map(action => action.getStats());

    return subactionUpdates.reduce(
      (prev, cur) => StatsUpdateHelper.concatUpdates(prev, cur),
      update
    );
  }

  static fromJSON(json: { [key: string]: any; }): FullElixirAction | undefined {
    const actionType = json["actionType"];
    if (actionType == ActionType.USED_FULL_ELIXIR) {
      return new FullElixirAction(
        json["actionNumber"] as number,
        json["subactions"].map((action: any) => {
          return BattleActionParser.fromJSON(action);
        }) as BattleAction[],
      );
    } else {
      console.error(`FullElixirAction.fromJSON called on ${json}`);
      return undefined;
    }
  }
}