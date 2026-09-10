import { JSX } from "react/jsx-runtime";
import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";
import { BattleActionParser } from "./battleactionparser";
import { GodsightBattleData } from "./battledata";
import { DamageInstance } from "./damageinstance";
import { StatsUpdate, StatsUpdateHelper } from "./stats";
import { BattleActionHelper } from "./battleactionhelper";
import { Actor } from "../../gbf/battletypes/scenariodata/mechanics/actor";
import { GodsightBossData } from "./bossdata";
import { GodsightPartyFormationData } from "./partyformationdata";
import { assertNotNullOrUndefined } from "../../util/assert";

export class SummonAction extends BattleAction {
  public actionType: ActionType = ActionType.CALLED_SUMMON;

  constructor(
    public actionNumber: number,
    public name: string,
    public damageInstances: DamageInstance[],
    public bossesAtTimeOfAction: GodsightBossData[],
    public formationAtTimeOfAction: GodsightPartyFormationData,
    public subactions: BattleAction[],
  ) {
    super();
  }

  getDescription(): JSX.Element {
    let damageInstanceJsx = <></>;
    if (this.damageInstances.length) {
      damageInstanceJsx = BattleActionHelper.getDamageInstanceJsx(
        this.bossesAtTimeOfAction,
        this.formationAtTimeOfAction,
        Actor.BOSS,
        this.damageInstances,
      );
    }

    return (
      <>
        <div className="action-description">{BattleActionHelper.getMainCharacterName(this.formationAtTimeOfAction)} called {this.name}!
          {damageInstanceJsx}
          {this.subactions.map(subaction => (
            subaction.getDescription()
          ))}
        </div>
      </>
    );
  }

  getStats(): StatsUpdate {
    const update = StatsUpdateHelper.getEmptyStatsUpdate();

    this.damageInstances.forEach(instance => {
      update["generalStats"]["otherDamage"][instance["element"]] += instance["value"];
    });

    const subactionUpdates = this.subactions.map(action => action.getStats());

    return subactionUpdates.reduce(
      (prev, cur) => StatsUpdateHelper.concatUpdates(prev, cur),
      update
    );
  }

  static fromJSON(json: { [key: string]: any; }): SummonAction | undefined {
    const actionType = json["actionType"];
    if (actionType == ActionType.CALLED_SUMMON) {
      return new this(
        assertNotNullOrUndefined(json["actionNumber"] as number),
        assertNotNullOrUndefined(json["name"] as string),
        assertNotNullOrUndefined(json["damageInstances"] as DamageInstance[]),
        assertNotNullOrUndefined(json["bossesAtTimeOfAction"] as GodsightBossData[]),
        assertNotNullOrUndefined(json["formationAtTimeOfAction"] as GodsightPartyFormationData),
        json["subactions"].map((action: any) => {
          return BattleActionParser.fromJSON(action);
        }) as BattleAction[],
      );
    } else {
      console.error(`this.fromJSON called on ${json}`);
      return undefined;
    }
  }
}