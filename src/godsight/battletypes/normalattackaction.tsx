import { JSX } from "react/jsx-runtime";
import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";
import { BattleActionParser } from "./battleactionparser";
import { StatsUpdate, StatsUpdateHelper } from "./stats";
import { SingularNormalAttackAction } from "./singularnormalattackaction";
import { assertNotNullOrUndefined } from "../../util/assert";
import { DamageDisplay } from "../settings/godsightsettings";

export class NormalAttackAction extends BattleAction {
  public actionType: ActionType = ActionType.NORMAL_ATTACK;

  constructor(
    public attackerName: string,
    public isCounter: boolean,
    public beforeBossTurn: boolean,
    public subactions: BattleAction[],
  ) {
    super();
  }

  // #futureproof
  private attackCountWording: Record<number, string> = {
    0: "couldn't attack",
    1: "made a single attack",
    2: "made a double attack",
    3: "made a triple attack",
    4: "made a quadruple attack",
    5: "made a quintuple attack",
    6: "made a sextuple attack",
    7: "made a septuple attack",
    8: "made an octuple attack",
    9: "made a nonuple attack",
    10: "made a decuple attack",
  }

  getDescription(key: number, damageDisplay: DamageDisplay): JSX.Element {
    const attacks = this.subactions.filter(a => a instanceof SingularNormalAttackAction);
    const attackCount = attacks.length;
    const attackWording = this.isCounter ? "executed a counter" : (this.attackCountWording[attackCount] || "made unknown attacks");

    return (
      <div key={key} className="action-description">{this.attackerName} {attackWording}!
        {this.subactions.map((subaction, idx) => (
          subaction.getDescription(idx, damageDisplay)
        ))}
      </div>
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

  static override fromJSON(json: Record<string, unknown>): NormalAttackAction | undefined {
    const actionType = json["actionType"];
    if (actionType == ActionType.NORMAL_ATTACK) {
      return new NormalAttackAction(
        assertNotNullOrUndefined(json["attackerName"] as string),
        assertNotNullOrUndefined(json["isCounter"] as boolean),
        assertNotNullOrUndefined(json["beforeBossTurn"] as boolean),
        (json["subactions"] as Record<string, unknown>[]).map(action => {
          return BattleActionParser.fromJSON(action);
        }) as BattleAction[],
      );
    } else {
      console.error(`NormalAttackAction.fromJSON called on ${json}`);
      return undefined;
    }
  }
}