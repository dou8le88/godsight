import { JSX } from "react/jsx-runtime";
import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";
import { BattleActionParser } from "./battleactionparser";
import { DamageInstance } from "./damageinstance";
import { StatsUpdate, StatsUpdateHelper } from "./stats";
import { BattleActionHelper } from "./battleactionhelper";
import { assertNotNullOrUndefined } from "../../util/assert";
import { GodsightSettings } from "../settings/godsightsettings";
import { GameElementHelper } from "../../gbf/battletypes/scenariodata/mechanics/element";

export class SummonAction extends BattleAction {
  public actionType: ActionType = ActionType.CALLED_SUMMON;

  constructor(
    public summonCallName: string,
    public mainCharacterName: string,
    public partySize: number,
    public beforeBossTurn: boolean,
    public damageInstances: DamageInstance[],
    public subactions: BattleAction[],
    public trueSummonHitCount: number | undefined,
  ) {
    super();
  }

  getDescription(key: number, settings: GodsightSettings): JSX.Element {
    let damageInstanceJsx = <></>;
    if (this.damageInstances.length) {
      damageInstanceJsx = BattleActionHelper.getDamageInstanceJsx(
        this.damageInstances,
        settings["damageDisplay"],
        this.trueSummonHitCount,
      );
    }

    return (
      <div key={key} className="action-description">{this.mainCharacterName} called {this.summonCallName}!
        {damageInstanceJsx}
        {this.subactions.map((subaction, idx) => (
          subaction.getDescription(idx, settings)
        ))}
      </div>
    );
  }

  getStats(): StatsUpdate {
    const update = StatsUpdateHelper.getEmptyStatsUpdate(this.partySize);

    this.damageInstances.forEach(instance => {
      update["generalStats"]["otherDamage"][instance["element"]] += instance["value"];
      // The game considers summon damage to belong to MC
      update["characterStats"][0]["otherDamage"][instance["element"]] += instance["value"];
      if (this.beforeBossTurn) {
        update["beforeBossTurnStats"]["otherDamage"][instance["element"]] += instance["value"];
        update["characterBeforeBossTurnStats"][0]["otherDamage"][instance["element"]] += instance["value"];
      }

      if (instance["value"] > 0) {
        update["generalStats"]["hitCount"] += 1;
        update["characterStats"][0]["hitCount"] += 1;
        if (this.beforeBossTurn) {
          update["beforeBossTurnStats"]["hitCount"] += 1;
          update["characterBeforeBossTurnStats"][0]["hitCount"] += 1;
        }
      }
    });

    const maybeHitCountOverride = this.trueSummonHitCount;
    if (maybeHitCountOverride !== undefined) {
      update["generalStats"]["hitCount"] = maybeHitCountOverride;
      update["characterStats"][0]["hitCount"] = maybeHitCountOverride;
      if (this.beforeBossTurn) {
        update["beforeBossTurnStats"]["hitCount"] = maybeHitCountOverride;
        update["characterBeforeBossTurnStats"][0]["hitCount"] = maybeHitCountOverride;
      }
    }

    const subactionUpdates = this.subactions.map(action => action.getStats())

    const mergedSubactionUpdates = subactionUpdates.reduce(
      (prev, cur) => StatsUpdateHelper.concatUpdates(prev, cur),
      StatsUpdateHelper.getEmptyStatsUpdate(this.partySize),
    );

    const subactionHitCount = mergedSubactionUpdates["generalStats"]["hitCount"];
    const subactionSkillDamage = mergedSubactionUpdates["generalStats"]["skillDamage"];
    const subactionDebuffCount = mergedSubactionUpdates["generalStats"]["debuffsInflictedCount"];

    update["characterStats"][0]["hitCount"] += subactionHitCount;
    update["characterStats"][0]["debuffsInflictedCount"] += subactionDebuffCount;
    GameElementHelper.getAllElements().forEach(element => {
      update["characterStats"][0]["skillDamage"][element] += subactionSkillDamage[element];
    });

    if (this.beforeBossTurn) {
      update["characterBeforeBossTurnStats"][0]["hitCount"] += subactionHitCount;
      update["characterBeforeBossTurnStats"][0]["debuffsInflictedCount"] += subactionDebuffCount;
      GameElementHelper.getAllElements().forEach(element => {
        update["characterBeforeBossTurnStats"][0]["skillDamage"][element] += subactionSkillDamage[element];
      });
    }

    return StatsUpdateHelper.concatUpdates(update, mergedSubactionUpdates);
  }

  static override fromJSON(json: Record<string, unknown>): SummonAction | undefined {
    const actionType = json["actionType"];
    if (actionType == ActionType.CALLED_SUMMON) {
      return new this(
        assertNotNullOrUndefined(json["summonCallName"] as string),
        assertNotNullOrUndefined(json["mainCharacterName"] as string),
        assertNotNullOrUndefined(json["partySize"] as number),
        assertNotNullOrUndefined(json["beforeBossTurn"] as boolean),
        assertNotNullOrUndefined(json["damageInstances"] as DamageInstance[]),
        (json["subactions"] as Record<string, unknown>[]).map(action => {
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