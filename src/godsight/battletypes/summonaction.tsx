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
import { GodsightSummonData } from "./summondata";

export class SummonAction extends BattleAction {
  private hitCountRegex = /(\d+)-hit/g;
  public actionType: ActionType = ActionType.CALLED_SUMMON;


  constructor(
    public actionNumber: number,
    public name: string,
    public damageInstances: DamageInstance[],
    public bossesAtTimeOfAction: GodsightBossData[],
    public formationAtTimeOfAction: GodsightPartyFormationData,
    public subactions: BattleAction[],
    public trueSummonHitCount: number | undefined,
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
        this.trueSummonHitCount,
      );
    }

    return (
      <div key={this.actionNumber} className="action-description">{BattleActionHelper.getMainCharacterName(this.formationAtTimeOfAction)} called {this.name}!
        {damageInstanceJsx}
        {this.subactions.map(subaction => (
          subaction.getDescription()
        ))}
      </div>
    );
  }

  getStats(): StatsUpdate {
    const update = StatsUpdateHelper.getEmptyStatsUpdate(Object.keys(this.formationAtTimeOfAction["members"]));

    this.damageInstances.forEach(instance => {
      update["generalStats"]["otherDamage"][instance["element"]] += instance["value"];
      // The game considers summon damage to belong to MC
      update["characterStats"][0]["otherDamage"][instance["element"]] += instance["value"];

      if (instance["value"] > 0) {
        update["generalStats"]["hitCount"] += 1;
        update["characterStats"][0]["hitCount"] += 1;
      }
    });

    const maybeHitCountOverride = this.trueSummonHitCount;
    if (maybeHitCountOverride !== undefined) {
      update["generalStats"]["hitCount"] = maybeHitCountOverride;
      update["characterStats"][0]["hitCount"] = maybeHitCountOverride;
    }

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
        json["trueSummonHitCount"] as number | undefined,
      );
    } else {
      console.error(`this.fromJSON called on ${json}`);
      return undefined;
    }
  }
}