import { Actor } from "../../gbf/battletypes/scenariodata/mechanics/actor";
import { BattleAction } from "./battleaction";
import { StatsUpdate, StatsUpdateHelper } from "./stats";
import { GodsightCondition } from "./condition";
import { ActionType } from "./actiontype";
import { JSX } from "react/jsx-runtime";
import { BattleActionHelper } from "./battleactionhelper";
import { GodsightBossData } from "./bossdata";
import { GodsightPartyFormationData } from "./partyformationdata";

export class ConditionChangeAction extends BattleAction {
  public actionType: ActionType = ActionType.CONDITION_CHANGED;
  public subactions: BattleAction[] = [];

  constructor(
    public actionNumber: number,
    public target: Actor,
    public position: number,
    public missCount: number,
    public buffs: GodsightCondition[],
    public debuffs: GodsightCondition[],
    public unclassified: GodsightCondition[],
    public bossesAtTimeOfAction: GodsightBossData[],
    public formationAtTimeOfAction: GodsightPartyFormationData,
  ) {
    super();
  }

  getDescription(): JSX.Element {
    const allStatuses = [
      ...this.buffs,
      ...this.debuffs,
      ...this.unclassified
    ];

    const actorName = BattleActionHelper.getActorName(
      this.bossesAtTimeOfAction,
      this.formationAtTimeOfAction,
      this.target,
      this.position,
    );

    const gainedStatuses = allStatuses.filter(s => !s.dispelled);
    const dispelledStatuses = allStatuses.filter(s => s.dispelled);

    const gainedStatusesJsx: JSX.Element[] | null = gainedStatuses.map((status, idx) => (
      <>
        <span key={idx} className="status-text">{status.name}</span> <img className="status-icon" src={BattleActionHelper.getStatusUrl(status.icon)} />
      </>
    )).reduce((prev: any, cur) => prev === null ? [cur] : [...prev, <>, </>, cur], null);

    const dispelledStatusesJsx: JSX.Element[] | null = dispelledStatuses.map(status => (
      <>
        <span className="status-text">{status.name}</span> <img className="status-icon" src={BattleActionHelper.getStatusUrl(status.icon)} />
      </>
    )).reduce((prev: any, cur) => prev === null ? [cur] : [...prev, <>, </>, cur], null);

    let finalGainedStatusJsx = <></>;
    if (gainedStatusesJsx) {
      finalGainedStatusJsx = (
        <>
          {actorName} received {gainedStatusesJsx}!
        </>
      );
    }

    let finalDispelledStatusesJsx = <></>;
    if (dispelledStatusesJsx) {
      finalDispelledStatusesJsx = (
        <>
          {actorName} had {dispelledStatusesJsx} dispelled!
        </>
      );
    }

    return (
      <>
        <div className="action-description">{finalDispelledStatusesJsx} {finalGainedStatusJsx}
        </div>
      </>
    );
  }

  getStats(): StatsUpdate {
    const update = StatsUpdateHelper.getEmptyStatsUpdate();
    if (this.target == Actor.BOSS) {
      update["generalStats"]["debuffsInflictedCount"] += this.debuffs.length;
      // TODO: figure out a way of associating the debuffs with a specific character.
      // May not be consistently possible.
      return update;
    } else {
      return update;
    }
  }

  static fromJSON(json: { [key: string]: any; }): ConditionChangeAction | undefined {
    const actionType = json["actionType"];
    if (actionType == ActionType.CONDITION_CHANGED) {
      return new ConditionChangeAction(
        json["actionNumber"] as number,
        json["target"] as Actor,
        json["position"] as number,
        json["missCount"] as number,
        json["buffs"] as GodsightCondition[],
        json["debuffs"] as GodsightCondition[],
        json["unclassified"] as GodsightCondition[],
        json["bossesAtTimeOfAction"] as GodsightBossData[],
        json["formationAtTimeOfAction"] as GodsightPartyFormationData,
      );
    } else {
      console.error(`ConditionChangeAction.fromJSON called on ${json}`);
      return undefined;
    }
  }
}