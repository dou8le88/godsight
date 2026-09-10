import { JSX } from "react/jsx-runtime";
import { Actor } from "../../gbf/battletypes/scenariodata/mechanics/actor";
import { GameElementHelper } from "../../gbf/battletypes/scenariodata/mechanics/element";
import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";
import { BattleActionParser } from "./battleactionparser";
import { StatsUpdate, StatsUpdateHelper } from "./stats";
import { BattleActionHelper } from "./battleactionhelper";
import { GodsightBossData } from "./bossdata";
import { GodsightPartyFormationData } from "./partyformationdata";
import { assertNotNullOrUndefined } from "../../util/assert";

export class AbilityAction extends BattleAction {
  public actionType: ActionType = ActionType.ACTIVATED_ABILITY;
  public overrideMessage: string = "";

  constructor(
    public actionNumber: number,
    public name: string,
    public actor: Actor,
    public position: number,
    public bossesAtTimeOfAction: GodsightBossData[],
    public formationAtTimeOfAction: GodsightPartyFormationData,
    public subactions: BattleAction[],
  ) {
    super();
  }

  getDescription(): JSX.Element {
    if (this.overrideMessage) {
      return (
        <div className="action-description" >{this.overrideMessage}
          {
            this.subactions.map(subaction => (
              subaction.getDescription()
            ))
          }
        </div>
      );
    } else {
      const actorName = BattleActionHelper.getActorName(
        this.bossesAtTimeOfAction,
        this.formationAtTimeOfAction,
        this.actor,
        this.position
      );

      return (
        <>
          <div className="action-description"> {actorName} activated {this.name}!
            {
              this.subactions.map(subaction => (
                subaction.getDescription()
              ))
            }
          </div>
        </>
      );
    }

  }

  getStats(): StatsUpdate {
    const update = StatsUpdateHelper.getEmptyStatsUpdate();
    const subactionStatsUpdates = this.subactions.map(action => action.getStats());
    const allUpdates = subactionStatsUpdates.reduce(
      (prev, cur) => StatsUpdateHelper.concatUpdates(prev, cur),
      update,
    );
    switch (this.actor) {
      case Actor.PLAYER:
        // The subactions have no way to associate certain general stats with
        // a specific character, so we must do it here for now. TODO: fix.
        const subactionHitCount = allUpdates["generalStats"]["hitCount"];
        const subactionDebuffs = allUpdates["generalStats"]["debuffsInflictedCount"];
        const subactionSkillDamage = allUpdates["generalStats"]["skillDamage"];

        if (!allUpdates["characterStats"][this.position]) {
          allUpdates["characterStats"][this.position] = StatsUpdateHelper.getEmptyStats();
        }
        allUpdates["characterStats"][this.position]["hitCount"] += subactionHitCount;
        allUpdates["characterStats"][this.position]["debuffsInflictedCount"] += subactionDebuffs;
        GameElementHelper.getAllElements().forEach(element => {
          allUpdates["characterStats"][this.position]["skillDamage"][element] += subactionSkillDamage[element];
        });
        break;
      case Actor.BOSS:
        // The boss used an "ability", can happen in certain raids.
        // Due to the quirks of the underlying commands, stats should be tracked correctly
        // via subactions in this case.
        break;
      default:
        console.error(`Got unknown target ${this.actor} for AbilityAction`);
        break;
    }

    return allUpdates;
  }

  static fromJSON(json: Record<string, unknown>): AbilityAction | undefined {
    const actionType = json["actionType"];
    if (actionType == ActionType.ACTIVATED_ABILITY) {
      return new AbilityAction(
        assertNotNullOrUndefined(json["actionNumber"] as number),
        assertNotNullOrUndefined(json["name"] as string),
        assertNotNullOrUndefined(json["actor"] as Actor),
        assertNotNullOrUndefined(json["position"] as number),
        assertNotNullOrUndefined(json["bossesAtTimeOfAction"] as GodsightBossData[]),
        assertNotNullOrUndefined(json["formationAtTimeOfAction"] as GodsightPartyFormationData),
        (json["subactions"] as Record<string, unknown>[]).map((action: any) => {
          return BattleActionParser.fromJSON(action);
        }) as BattleAction[],
      );
    } else {
      console.error(`AbilityAction.fromJSON called on ${json}`);
      return undefined;
    }
  }
}