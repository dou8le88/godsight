import { GameElementValue } from './mechanics/element';
import { AttackAccuracyResult } from './mechanics/attackaccuracyresult';

export interface SkillOrDebuffDamageInstance {
  /**
   * Damage value for this hit
   */
  'value': number;
  /**
   * 0-indexed hit #
   */
  'attack_num': number;
  /**
   * Target's HP after this instance of damage
   */
  'hp': number;
  'color': GameElementValue;
  'critical': boolean;
  'miss': AttackAccuracyResult | boolean;
  'guard': boolean;
  'pos': number;
}
