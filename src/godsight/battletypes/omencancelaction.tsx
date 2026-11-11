import { JSX } from 'react/jsx-runtime';
import { ActionType } from './actiontype';
import { BattleAction } from './battleaction';
import { StatsUpdate, StatsUpdateHelper } from './stats';
import { assertNotNullOrUndefined } from '../../util/assert';
import { GodsightSettings } from '../settings/godsightsettings';

export class OmenCancelAction extends BattleAction {
  public actionType: ActionType = ActionType.OMEN_CANCELLED;
  public subactions: BattleAction[] = [];

  constructor(
    public bossName: string,
    public beforeBossTurn: boolean,
  ) {
    super();
  }

  getStats(): StatsUpdate {
    return StatsUpdateHelper.getEmptyStatsUpdate();
  }

  getDescription(key: number, _settings: GodsightSettings): JSX.Element {
    return (
      <div
        key={key}
        className="action-description"
      >
        {this.bossName}&apos;s omen was canceled!
      </div>
    );
  }

  static override fromJSON(
    json: Record<string, unknown>,
  ): OmenCancelAction | undefined {
    const actionType = json['actionType'];
    if (actionType == ActionType.OMEN_CANCELLED) {
      return new OmenCancelAction(
        assertNotNullOrUndefined(json['bossName'] as string),
        assertNotNullOrUndefined(json['beforeBossTurn'] as boolean),
      );
    } else {
      console.error(`OmenCancelAction.fromJSON called on ${json}`);
      return undefined;
    }
  }
}
