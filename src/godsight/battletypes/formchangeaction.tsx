import { JSX } from 'react/jsx-runtime';
import { GodsightSettings } from '../settings/godsightsettings';
import { ActionType } from './actiontype';
import { BattleAction } from './battleaction';
import { StatsUpdate, StatsUpdateHelper } from './stats';
import { assertNotNullOrUndefined } from '../../util/assert';

export class FormChangeAction extends BattleAction {
  actionType: ActionType = ActionType.FORM_CHANGE;
  subactions: BattleAction[] = [];

  constructor(
    public name: string,
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
        {this.name} changed forms!
      </div>
    );
  }

  static override fromJSON(
    json: Record<string, unknown>,
  ): FormChangeAction | undefined {
    const actionType = json['actionType'];
    if (actionType == ActionType.FORM_CHANGE) {
      const action = new FormChangeAction(
        assertNotNullOrUndefined(json['name'] as string),
        assertNotNullOrUndefined(json['beforeBossTurn'] as boolean),
      );
      return action;
    } else {
      console.error(`FormChangeAction.fromJSON called on ${json}`);
      return undefined;
    }
  }
}
