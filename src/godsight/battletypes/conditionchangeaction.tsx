import { Actor } from '../../gbf/battletypes/scenariodata/mechanics/actor';
import { BattleAction } from './battleaction';
import { StatsUpdate, StatsUpdateHelper } from './stats';
import { GodsightCondition } from './condition';
import { ActionType } from './actiontype';
import { JSX } from 'react/jsx-runtime';
import { BattleActionHelper } from './battleactionhelper';
import { assertNotNullOrUndefined } from '../../util/assert';
import { GodsightSettings } from '../settings/godsightsettings';

export class ConditionChangeAction extends BattleAction {
  public actionType: ActionType = ActionType.CONDITION_CHANGED;
  public subactions: BattleAction[] = [];

  constructor(
    public target: Actor,
    public targetName: string,
    public missCount: number,
    public beforeBossTurn: boolean,
    public buffs: GodsightCondition[],
    public debuffs: GodsightCondition[],
    public unclassified: GodsightCondition[],
  ) {
    super();
  }

  getDescription(key: number, settings: GodsightSettings): JSX.Element {
    const allStatuses = [...this.buffs, ...this.debuffs, ...this.unclassified];

    const gainedStatuses = allStatuses.filter((s) => !s.dispelled);
    const dispelledStatuses = allStatuses.filter((s) => s.dispelled);

    const gainedStatusesJsx: React.ReactNode[] | null = gainedStatuses
      .map((status, idx) =>
        BattleActionHelper.getStatusTextJsx(status, settings, idx),
      )
      .reduce(
        (prev: React.ReactNode[] | null, cur) =>
          prev === null ? [cur] : [...prev, ', ', cur],
        null,
      );

    const dispelledStatusesJsx: React.ReactNode[] | null = dispelledStatuses
      .map((status, idx) =>
        BattleActionHelper.getStatusTextJsx(status, settings, idx),
      )
      .reduce(
        (prev: React.ReactNode[] | null, cur) =>
          prev === null ? [cur] : [...prev, ', ', cur],
        null,
      );

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
      let connectorWord = 'was';
      if (dispelledStatuses.length > 1) {
        connectorWord = 'were';
      }
      finalDispelledStatusesJsx = (
        <>
          {this.targetName}&apos;s {dispelledStatusesJsx} {connectorWord}{' '}
          dispelled!
        </>
      );
    }

    let finalMissedStatusesJsx = <></>;
    if (this.missCount > 0) {
      let effectWord = 'effects';
      if (this.missCount == 1) {
        effectWord = 'effect';
      }
      finalMissedStatusesJsx = (
        <>
          {this.missCount} status {effectWord} missed!
        </>
      );
    }

    return (
      <div
        key={key}
        className="action-description"
      >
        {finalDispelledStatusesJsx} {finalGainedStatusJsx}{' '}
        {finalMissedStatusesJsx}
      </div>
    );
  }

  getStats(): StatsUpdate {
    const update = StatsUpdateHelper.getEmptyStatsUpdate();
    if (this.target == Actor.BOSS) {
      update['generalStats']['debuffsInflictedCount'] += this.debuffs.length;
      if (this.beforeBossTurn) {
        update['beforeBossTurnStats']['debuffsInflictedCount'] +=
          this.debuffs.length;
      }
      return update;
    } else {
      return update;
    }
  }

  static override fromJSON(
    json: Record<string, unknown>,
  ): ConditionChangeAction | undefined {
    const actionType = json['actionType'];
    if (actionType == ActionType.CONDITION_CHANGED) {
      return new ConditionChangeAction(
        assertNotNullOrUndefined(json['target'] as Actor),
        assertNotNullOrUndefined(json['targetName'] as string),
        assertNotNullOrUndefined(json['missCount'] as number),
        assertNotNullOrUndefined(json['beforeBossTurn'] as boolean),
        assertNotNullOrUndefined(json['buffs'] as GodsightCondition[]),
        assertNotNullOrUndefined(json['debuffs'] as GodsightCondition[]),
        assertNotNullOrUndefined(json['unclassified'] as GodsightCondition[]),
      );
    } else {
      console.error(`ConditionChangeAction.fromJSON called on ${json}`);
      return undefined;
    }
  }
}
