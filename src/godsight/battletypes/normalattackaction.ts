import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";
import { BattleActionParser } from "./battleactionparser";
import { StatsUpdate, StatsUpdateHelper } from "./stats";

export class NormalAttackAction extends BattleAction {
  public actionType: ActionType = ActionType.NORMAL_ATTACK;

  constructor(
    public actionNumber: number,
    public subactions: BattleAction[],
  ) {
    super();
  }

  getSimpleDescription(): string {
    return `An entity made a normal attack!`;
  }

  getStats(): StatsUpdate {
    const update = StatsUpdateHelper.getEmptyStatsUpdate();

    const subactionUpdates = this.subactions.map(action => action.getStats());

    return subactionUpdates.reduce(
      (prev, cur) => StatsUpdateHelper.concatUpdates(prev, cur),
      update
    );
  }

  static fromJSON(json: { [key: string]: any; }): NormalAttackAction | undefined {
    const actionType = json["actionType"];
    if (actionType == ActionType.NORMAL_ATTACK) {
      return new NormalAttackAction(
        json["actionNumber"] as number,
        json["subactions"].map((action: any) => {
          return BattleActionParser.fromJSON(action);
        }) as BattleAction[],
      );
    } else {
      console.error(`NormalAttackAction.fromJSON called on ${json}`);
      return undefined;
    }
  }
}