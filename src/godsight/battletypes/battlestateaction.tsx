import { JSX } from 'react/jsx-runtime';
import { GodsightSettings } from '../settings/godsightsettings';
import { ActionType } from './actiontype';
import { BattleAction } from './battleaction';
import { StatsUpdate, StatsUpdateHelper } from './stats';
import { GameElementValue } from '../../gbf/battletypes/scenariodata/mechanics/element';
import { HpBar } from '../../react/battletracker/hpbar';
import { Actor } from '../../gbf/battletypes/scenariodata/mechanics/actor';
import Avatar from '../../react/battletracker/avatar';
import { assertNotNullOrUndefined } from '../../util/assert';

export interface BossSnapshot {
  'name': string;
  'hp': number;
  'hpMax': number;
  'element': GameElementValue;
}

export interface CharacterSnapshot {
  'name': string;
  'hp': number;
  'hpMax': number;
  'element': GameElementValue;
  'alive': boolean;
  'portraitImageId': string;
  'isMC': boolean;
  'backline': boolean;
}

export class BattleStateAction extends BattleAction {
  actionType: ActionType = ActionType.BATTLE_STATE;
  subactions: BattleAction[] = [];
  beforeBossTurn = false;

  constructor(
    public wave: number,
    public bosses: BossSnapshot[],
    public characters: CharacterSnapshot[],
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
        <div className="state-snapshot">
          <div className="boss-snapshot">
            {this.bosses.map((boss, idx) => (
              <HpBar
                key={idx}
                currentHp={boss['hp']}
                maxHp={boss['hpMax']}
                actor={Actor.BOSS}
              />
            ))}
          </div>
          <div className="player-snapshot">
            {this.characters.map((character, idx) => (
              <Avatar
                key={idx}
                characterData={character}
                backline={character['backline']}
                showName
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  static override fromJSON(
    json: Record<string, unknown>,
  ): BattleStateAction | undefined {
    const actionType = json['actionType'];
    if (actionType == ActionType.BATTLE_STATE) {
      return new BattleStateAction(
        assertNotNullOrUndefined(json['wave'] as number),
        assertNotNullOrUndefined(json['bosses'] as BossSnapshot[]),
        assertNotNullOrUndefined(json['characters'] as CharacterSnapshot[]),
      );
    } else {
      console.error(`BattleStateAction.fromJSON called on ${json}`);
      return undefined;
    }
  }
}
