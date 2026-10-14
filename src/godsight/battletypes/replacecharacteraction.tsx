import { JSX } from 'react/jsx-runtime';
import { ActionType } from './actiontype';
import { BattleAction } from './battleaction';
import { StatsUpdate, StatsUpdateHelper } from './stats';
import { assertNotNullOrUndefined } from '../../util/assert';
import { GodsightSettings } from '../settings/godsightsettings';

export class ReplaceCharacterAction extends BattleAction {
  public actionType: ActionType = ActionType.REPLACED_CHARACTER;
  public subactions: BattleAction[] = [];

  constructor(
    public characterName: string,
    public replacementCharacterName: string,
    public beforeBossTurn: boolean,
  ) {
    super();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getDescription(key: number, settings: GodsightSettings): JSX.Element {
    return (
      <div
        key={key}
        className="action-description"
      >
        {this.characterName} swapped with {this.replacementCharacterName}!
      </div>
    );
  }

  getStats(): StatsUpdate {
    return StatsUpdateHelper.getEmptyStatsUpdate();
  }

  static override fromJSON(
    json: Record<string, unknown>,
  ): ReplaceCharacterAction | undefined {
    const actionType = json['actionType'];
    if (actionType == ActionType.REPLACED_CHARACTER) {
      return new ReplaceCharacterAction(
        assertNotNullOrUndefined(json['characterName'] as string),
        assertNotNullOrUndefined(json['replacementCharacterName'] as string),
        assertNotNullOrUndefined(json['beforeBossTurn'] as boolean),
      );
    } else {
      console.error(`ReplaceCharacterAction.fromJSON called on ${json}`);
      return undefined;
    }
  }
}
