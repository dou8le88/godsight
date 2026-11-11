import { JSX } from 'react/jsx-runtime';
import { GodsightSettings } from '../settings/godsightsettings';
import { ActionType } from './actiontype';
import { BattleAction } from './battleaction';
import { StatsUpdate, StatsUpdateHelper } from './stats';

export class DBStarCharacterRescueAction extends BattleAction {
  actionType: ActionType = ActionType.STAR_CHARACTER_RESCUE;
  subactions: BattleAction[] = [];
  beforeBossTurn = true;

  constructor() {
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
        A star character came to the rescue!
      </div>
    );
  }

  static override fromJSON(
    json: Record<string, unknown>,
  ): DBStarCharacterRescueAction | undefined {
    const actionType = json['actionType'];
    if (actionType == ActionType.STAR_CHARACTER_RESCUE) {
      return new DBStarCharacterRescueAction();
    } else {
      console.error(`DBStarCharacterRescueAction.fromJSON called on ${json}`);
      return undefined;
    }
  }
}
