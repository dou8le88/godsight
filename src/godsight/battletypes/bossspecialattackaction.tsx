import { GameElementValue } from "../../gbf/battletypes/scenariodata/mechanics/element"
import { Actor } from "../../gbf/battletypes/scenariodata/mechanics/actor"
import { ActionType } from "./actiontype"
import { BattleAction } from "./battleaction"
import { DamageInstance } from "./damageinstance"
import { StatsUpdate, StatsUpdateHelper } from "./stats"
import { BattleActionParser } from "./battleactionparser"
import { JSX } from "react/jsx-runtime"
import { BattleActionHelper } from "./battleactionhelper"
import { GodsightBossData } from "./bossdata"
import { GodsightPartyFormationData } from "./partyformationdata"
import { assertNotNullOrUndefined } from "../../util/assert"

export class BossSpecialAttackAction extends BattleAction {
  public actionType: ActionType = ActionType.BOSS_SPECIAL_ATTACK;

  constructor(
    public actionNumber: number,
    public attackName: string,
    public sourceName: string,
    public target: Actor,
    public count: number,
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
        this.target,
        this.damageInstances,
      );
    }

    return (
      <div key={this.actionNumber} className="action-description">{this.sourceName} activated {this.attackName}!
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
      // Bosses can target themselves (e.g., with self-buff or stance-changey kinds of specials),
      // so ignore effects for the purposes of stats if they aren't targeting a player.
      if (this.target == Actor.PLAYER) {
        const damage = instance["value"];
        update["generalStats"]["damageTaken"][instance["element"]] += damage;
        const receiverIndex = BattleActionHelper.getCharacterIndexAtPosition(
          this.formationAtTimeOfAction,
          instance["receiverPosition"],
        );
        update["characterStats"][receiverIndex]["damageTaken"][instance["element"]] += damage;
      }
    });
    const subactionStatsUpdates = this.subactions.map(action => action.getStats());
    return subactionStatsUpdates.reduce(
      (prev, cur) => StatsUpdateHelper.concatUpdates(prev, cur),
      update
    );
  }

  static fromJSON(json: { [key: string]: any }): BossSpecialAttackAction | undefined {
    const actionType = json["actionType"];
    if (actionType == ActionType.BOSS_SPECIAL_ATTACK) {
      return new BossSpecialAttackAction(
        assertNotNullOrUndefined(json["actionNumber"] as number),
        assertNotNullOrUndefined(json["attackName"] as string),
        assertNotNullOrUndefined(json["sourceName"] as string),
        assertNotNullOrUndefined(json["target"] as Actor),
        assertNotNullOrUndefined(json["count"] as number),
        assertNotNullOrUndefined(json["damageInstances"] as DamageInstance[]),
        assertNotNullOrUndefined(json["bossesAtTimeOfAction"] as GodsightBossData[]),
        assertNotNullOrUndefined(json["formationAtTimeOfAction"] as GodsightPartyFormationData),
        json["subactions"].map((action: any) => {
          return BattleActionParser.fromJSON(action);
        }) as BattleAction[],
      );
    } else {
      console.error(`BossSpecialAttackAction.fromJSON called on ${json}`);
      return undefined;
    }
  }
}
