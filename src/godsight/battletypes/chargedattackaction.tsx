import { Actor } from "../../gbf/battletypes/scenariodata/mechanics/actor";
import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";
import { DamageInstance } from "./damageinstance";
import { StatsUpdate, StatsUpdateHelper } from "./stats";
import { BattleActionParser } from "./battleactionparser";
import { JSX } from "react/jsx-runtime";
import { BattleActionHelper } from "./battleactionhelper";
import { assertNotNullOrUndefined } from "../../util/assert";
import { GodsightSettings } from "../settings/godsightsettings";
import { GameElementHelper } from "../../gbf/battletypes/scenariodata/mechanics/element";

export class ChargedAttackAction extends BattleAction {
  public actionType: ActionType = ActionType.CHARGED_ATTACK;

  constructor(
    public name: string,
    public attackerIndex: number,
    public attackerName: string,
    public target: Actor,
    public partySize: number,
    public beforeBossTurn: boolean,
    public damageTotals: DamageInstance[],
    public subactions: BattleAction[],
  ) {
    super();
  }

  getDescription(key: number, settings: GodsightSettings): JSX.Element {
    const damageInstanceJsx = BattleActionHelper.getDamageInstanceJsx(
      this.damageTotals,
      settings["damageDisplay"],
    );

    return (
      <div key={key} className="action-description">{this.attackerName} activated their charged attack, {this.name}!
        {damageInstanceJsx}
        {
          this.subactions.map((subaction, idx) => (
            subaction.getDescription(idx, settings)
          ))
        }
      </div>
    );
  }

  getStats(): StatsUpdate {
    const update = StatsUpdateHelper.getEmptyStatsUpdate(this.partySize);
    if (this.target == Actor.BOSS) {
      this.damageTotals.forEach(instance => {
        update["generalStats"]["chargedAttackDamage"][instance["element"]] += instance["value"];
        update["characterStats"][this.attackerIndex]["chargedAttackDamage"][instance["element"]] += instance["value"];
        if (this.beforeBossTurn) {
          update["beforeBossTurnStats"]["chargedAttackDamage"][instance["element"]] += instance["value"];
          update["characterBeforeBossTurnStats"][this.attackerIndex]["chargedAttackDamage"][instance["element"]] += instance["value"];
        }
        if (instance["value"] > 0) {
          update["generalStats"]["hitCount"] += 1;
          update["characterStats"][this.attackerIndex]["hitCount"] += 1;
          if (this.beforeBossTurn) {
            update["beforeBossTurnStats"]["hitCount"] += 1;
            update["characterBeforeBossTurnStats"][this.attackerIndex]["hitCount"] += 1;
          }
        }
      });
      const subactionUpdates = this.subactions.map(action => action.getStats()).reduce(
        (prev, cur) => StatsUpdateHelper.concatUpdates(prev, cur),
        StatsUpdateHelper.getEmptyStatsUpdate(this.partySize)
      );

      // Damage stats from subactions can happen when a CA does bonus skill damage or somesuch.
      // These subactions have no way to associate certain general stats with
      // a specific character, so we must do it here.
      const subactionHitCount = subactionUpdates["generalStats"]["hitCount"];
      const subactionDebuffs = subactionUpdates["generalStats"]["debuffsInflictedCount"];
      const subactionSkillDamage = subactionUpdates["generalStats"]["skillDamage"];

      subactionUpdates["characterStats"][this.attackerIndex]["hitCount"] += subactionHitCount;
      subactionUpdates["characterStats"][this.attackerIndex]["debuffsInflictedCount"] += subactionDebuffs;
      if (this.beforeBossTurn) {
        subactionUpdates["characterBeforeBossTurnStats"][this.attackerIndex]["hitCount"] += subactionHitCount;
        subactionUpdates["characterBeforeBossTurnStats"][this.attackerIndex]["debuffsInflictedCount"] += subactionDebuffs;
      }
      GameElementHelper.getAllElements().forEach(element => {
        subactionUpdates["characterStats"][this.attackerIndex]["skillDamage"][element] += subactionSkillDamage[element];
        if (this.beforeBossTurn) {
          subactionUpdates["characterBeforeBossTurnStats"][this.attackerIndex]["skillDamage"][element] +=
            subactionSkillDamage[element];
        }
      });

      return StatsUpdateHelper.concatUpdates(update, subactionUpdates);
    } else {
      console.error(`Got ${this.target} target for ChargedAttackAction`);
      return update;
    }
  }

  static override fromJSON(json: Record<string, unknown>): ChargedAttackAction | undefined {
    const actionType = json["actionType"];
    if (actionType == ActionType.CHARGED_ATTACK) {
      return new ChargedAttackAction(
        assertNotNullOrUndefined(json["name"] as string),
        assertNotNullOrUndefined(json["attackerIndex"] as number),
        assertNotNullOrUndefined(json["attackerName"] as string),
        assertNotNullOrUndefined(json["target"] as Actor),
        assertNotNullOrUndefined(json["partySize"] as number),
        assertNotNullOrUndefined(json["beforeBossTurn"] as boolean),
        assertNotNullOrUndefined(json["damageTotals"] as DamageInstance[]),
        (json["subactions"] as Record<string, unknown>[]).map(action => {
          return BattleActionParser.fromJSON(action);
        }) as BattleAction[],
      );
    } else {
      console.error(`ChargedAttackAction.fromJSON called on ${json}`);
      return undefined;
    }
  }
}