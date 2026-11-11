import { JSX } from 'react/jsx-runtime';
import { GodsightSettings } from '../settings/godsightsettings';
import { ActionType } from './actiontype';
import { BattleAction } from './battleaction';
import { StatsUpdate, StatsUpdateHelper } from './stats';
import { assertNotNullOrUndefined } from '../../util/assert';

export class PartyChangeAction extends BattleAction {
  actionType: ActionType = ActionType.SWITCHED_PARTIES;
  subactions: BattleAction[] = [];

  constructor(
    public oldPartyId: number,
    public newPartyId: number,
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
        Party {this.oldPartyId} left the field! Party {this.newPartyId} took to
        the field!
      </div>
    );
  }

  static override fromJSON(
    json: Record<string, unknown>,
  ): PartyChangeAction | undefined {
    const actionType = json['actionType'];
    if (actionType == ActionType.SWITCHED_PARTIES) {
      return new PartyChangeAction(
        assertNotNullOrUndefined(json['oldPartyId'] as number),
        assertNotNullOrUndefined(json['newPartyId'] as number),
        assertNotNullOrUndefined(json['beforeBossTurn'] as boolean),
      );
    } else {
      console.error(`PartyChangeAction.fromJSON called on ${json}`);
      return undefined;
    }
  }
}
