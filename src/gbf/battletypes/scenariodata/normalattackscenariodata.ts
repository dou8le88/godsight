import { GenericScenarioData } from './genericscenariodata';
import { GameElementValue } from './mechanics/element';
import { AttackAccuracyResult } from './mechanics/attackaccuracyresult';
import { Actor } from './mechanics/actor';
import { ScenarioCommand } from './scenariocommand';

export interface NormalAttackScenarioData extends GenericScenarioData {
  'cmd': ScenarioCommand.NORMAL_ATTACK;
  'from': Actor;
  'pos': number;
  'num': number;
  'color': GameElementValue;
  'total_attack_num': number;
  'damage': NormalAttackDamage[][] | Record<string, NormalAttackDamage[]>;
  'is_all_attack': boolean;
  /**
   * This field only seems to exist for counters. Since counter commands
   * are fired one at a time instead of as a "triple attack", say, if you counter three times,
   * the client needs to be able to know what attack animation to play for each counter.
   * So the mere existence of this field can be used to tell if a normal attack is a counter.
   */
  'motion'?: string;
}

export interface NormalAttackDamage {
  'attack_count': number;
  'concurrent_attack_count': number;
  'pos': number;
  'value': number;
  /**
   * Target HP after receiving this damage.
   */
  'hp': number;
  'critical': boolean;
  'miss': AttackAccuracyResult;
  'color'?: GameElementValue;
  'attr'?: GameElementValue;
  'guard': boolean;
}
