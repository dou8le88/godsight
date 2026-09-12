import { GameElementValue } from "../../gbf/battletypes/scenariodata/mechanics/element";
import { Actor } from "../../gbf/battletypes/scenariodata/mechanics/actor";
import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";
import { DamageInstance } from "./damageinstance";
import { StatsUpdate, StatsUpdateHelper } from "./stats";
import { GodsightBattleData } from "./battledata";
import { JSX } from "react/jsx-runtime";
import { BattleActionHelper } from "./battleactionhelper";
import { GodsightBossData } from "./bossdata";
import { GodsightPartyFormationData } from "./partyformationdata";
import { assertNotNullOrUndefined } from "../../util/assert";

export class SingularNormalAttackAction extends BattleAction {
  public actionType: ActionType = ActionType.SINGULAR_NORMAL_ATTACK;
  public subactions: BattleAction[] = [];

  constructor(
    public actionNumber: number,
    public source: Actor,
    public attackerPosition: number,
    public damageInstances: DamageInstance[],
    public bossesAtTimeOfAction: GodsightBossData[],
    public formationAtTimeOfAction: GodsightPartyFormationData,
  ) {
    super();
  }

  getDescription(): JSX.Element {
    let receiver: Actor = Actor.BOSS;
    if (this.source == Actor.BOSS) {
      receiver = Actor.PLAYER;
    } else if (this.source == Actor.PLAYER) {
      receiver = Actor.BOSS;
    } else {
      console.error(`Unknown normal attack source ${this.source}`);
    }

    const damageInstanceJsx = BattleActionHelper.getDamageInstanceJsx(
      this.bossesAtTimeOfAction,
      this.formationAtTimeOfAction,
      receiver,
      this.damageInstances,
    );

    return (
      <span key={this.actionNumber}>
        {damageInstanceJsx}
      </span>
    );
  }

  getStats(): StatsUpdate {
    const update = StatsUpdateHelper.getEmptyStatsUpdate(Object.keys(this.formationAtTimeOfAction["members"]));

    switch (this.source) {
      case Actor.PLAYER:
        this.damageInstances.forEach(instance => {
          const attackerIndex = BattleActionHelper.getCharacterIndexAtPosition(
            this.formationAtTimeOfAction,
            this.attackerPosition,
          );
          update["generalStats"]["normalAttackDamage"][instance["element"]] += instance["value"];
          update["characterStats"][attackerIndex]["normalAttackDamage"][instance["element"]] += instance["value"];
          if (instance["value"] > 0) {
            update["generalStats"]["hitCount"] += 1;
            update["characterStats"][attackerIndex]["hitCount"] += 1;
          }
        });
        break;
      case Actor.BOSS:
        this.damageInstances.forEach(instance => {
          const receiverIndex = BattleActionHelper.getCharacterIndexAtPosition(
            this.formationAtTimeOfAction,
            instance["receiverPosition"],
          );
          update["generalStats"]["damageTaken"][instance["element"]] += instance["value"];
          update["characterStats"][receiverIndex]["damageTaken"][instance["element"]] += instance["value"];
        });
        break;
      default:
        console.error(`Unknown actor ${this.source} in SingularNormalAttackAction`)
        break;
    }

    return update;
  }

  static fromJSON(json: { [key: string]: any; }): SingularNormalAttackAction | undefined {
    const actionType = json["actionType"];
    if (actionType == ActionType.SINGULAR_NORMAL_ATTACK) {
      return new SingularNormalAttackAction(
        assertNotNullOrUndefined(json["actionNumber"] as number),
        assertNotNullOrUndefined(json["source"] as Actor),
        assertNotNullOrUndefined(json["attackerPosition"] as number),
        assertNotNullOrUndefined(json["damageInstances"] as DamageInstance[]),
        assertNotNullOrUndefined(json["bossesAtTimeOfAction"] as GodsightBossData[]),
        assertNotNullOrUndefined(json["formationAtTimeOfAction"] as GodsightPartyFormationData),
      );
    } else {
      console.error(`SingularNormalAttackAction.fromJSON called on ${json}`);
      return undefined;
    }
  }
}