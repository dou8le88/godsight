import { GenericScenarioData } from './genericscenariodata';
import { GameElementValue } from './mechanics/element';
import { AttackAccuracyResult } from './mechanics/attackaccuracyresult';
import { Actor } from './mechanics/actor';
import { ScenarioCommand } from './scenariocommand';

export interface BossSpecialAttackScenarioData extends GenericScenarioData {
  'cmd': ScenarioCommand.BOSS_SPECIAL_ATTACK;
  'name': string;
  /**
   * Source of the special attack.
   */
  'pos': number;
  'num': number;
  'target': Actor;
  'count': number;
  'attr': GameElementValue;
  'total': [];
  'list'?: BossSpecialAttackDamageSummary[];
}

export interface BossSpecialAttackDamageSummary {
  'damage': BossSpecialAttackDamageInstance[];
}

export interface BossSpecialAttackDamageInstance {
  'attr': GameElementValue;
  'pos': number;
  /**
   * Amount of damage.
   */
  'value': number;
  /**
   * Character HP after taking damage.
   */
  'hp': number;
  'critical': boolean;
  'miss': AttackAccuracyResult;
  'guard': boolean;
}
