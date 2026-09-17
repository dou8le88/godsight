import { Actor } from "../../gbf/battletypes/scenariodata/mechanics/actor";
import { BattleAction } from "./battleaction";
import { StatsUpdate, StatsUpdateHelper } from "./stats";
import { GodsightCondition } from "./condition";
import { ActionType } from "./actiontype";
import { JSX } from "react/jsx-runtime";
import { BattleActionHelper } from "./battleactionhelper";
import { assertNotNullOrUndefined } from "../../util/assert";

export class ConditionChangeAction extends BattleAction {
  public actionType: ActionType = ActionType.CONDITION_CHANGED;
  public subactions: BattleAction[] = [];

  constructor(
    public target: Actor,
    public targetName: string,
    public missCount: number,
    public buffs: GodsightCondition[],
    public debuffs: GodsightCondition[],
    public unclassified: GodsightCondition[],
  ) {
    super();
  }

  private iconlessStatusEffects = [
    "1047",
  ];

  getDescription(key: number): JSX.Element {
    const allStatuses = [
      ...this.buffs,
      ...this.debuffs,
      ...this.unclassified
    ];

    const gainedStatuses = allStatuses.filter(s => !s.dispelled);
    const dispelledStatuses = allStatuses.filter(s => s.dispelled);

    const gainedStatusesJsx: React.ReactNode[] | null = gainedStatuses.map((status, idx) => (
      <span key={idx}>
        <span className="status-text">{status.name}</span> {status.icon && !this.iconlessStatusEffects.includes(status.icon) ? <img className="status-icon" src={BattleActionHelper.getStatusUrl(status.icon)} /> : <></>}
      </span>
    )).reduce((prev: React.ReactNode[] | null, cur) => prev === null ? [cur] : [...prev, ", ", cur], null);

    const dispelledStatusesJsx: React.ReactNode[] | null = dispelledStatuses.map((status, idx) => (
      <span key={idx}>
        <span className="status-text">{status.name}</span> <img className="status-icon" src={BattleActionHelper.getStatusUrl(status.icon)} />
      </span>
    )).reduce((prev: React.ReactNode[] | null, cur) => prev === null ? [cur] : [...prev, ", ", cur], null);

    let finalGainedStatusJsx = <></>;
    if (gainedStatusesJsx) {
      finalGainedStatusJsx = (
        <>
          {this.targetName} received {gainedStatusesJsx}!
        </>
      );
    }

    let finalDispelledStatusesJsx = <></>;
    if (dispelledStatusesJsx) {
      let connectorWord = "was";
      if (dispelledStatuses.length > 1) {
        connectorWord = "were";
      }
      finalDispelledStatusesJsx = (
        <>
          {this.targetName}&apos;s {dispelledStatusesJsx} {connectorWord} dispelled!
        </>
      );
    }

    return (
      <div key={key} className="action-description">{finalDispelledStatusesJsx} {finalGainedStatusJsx}
      </div>
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

  static override fromJSON(json: Record<string, unknown>): ConditionChangeAction | undefined {
    const actionType = json["actionType"];
    if (actionType == ActionType.CONDITION_CHANGED) {
      return new ConditionChangeAction(
        assertNotNullOrUndefined(json["target"] as Actor),
        assertNotNullOrUndefined(json["targetName"] as string),
        assertNotNullOrUndefined(json["missCount"] as number),
        assertNotNullOrUndefined(json["buffs"] as GodsightCondition[]),
        assertNotNullOrUndefined(json["debuffs"] as GodsightCondition[]),
        assertNotNullOrUndefined(json["unclassified"] as GodsightCondition[]),
      );
    } else {
      console.error(`ConditionChangeAction.fromJSON called on ${json}`);
      return undefined;
    }
  }
}