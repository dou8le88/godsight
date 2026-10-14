import { JSX } from 'react/jsx-runtime';
import { ActionType } from './actiontype';
import { StatsUpdate } from './stats';
import { GodsightSettings } from '../settings/godsightsettings';

export abstract class BattleAction {
  abstract actionType: ActionType;
  abstract subactions: BattleAction[];
  abstract beforeBossTurn: boolean;

  abstract getStats(): StatsUpdate;

  abstract getDescription(key: number, settings: GodsightSettings): JSX.Element;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static fromJSON(json: Record<string, unknown>): BattleAction | undefined {
    throw new Error(
      'BattleAction subclasses must implement a `static fromJSON` method!',
    );
  }
}
