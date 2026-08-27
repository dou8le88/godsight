import { GameElementValue } from "./mechanics/element";
import { AttackAccuracyResult } from "./mechanics/attackaccuracyresult";

export type SkillOrDebuffDamageInstance = {
  /**
   * Damage value for this hit
   */
  "value": number,
  /**
   * 0-indexed hit #
   */
  "attack_num": number,
  /**
   * Target's HP after this instance of damage
   */
  "hp": number,
  "color": GameElementValue,
  "critical": boolean,
  /**
   * TODO: Expanded boolean with 0/1/2, for different types of missing?
   */
  "miss": AttackAccuracyResult,
  "guard": boolean,
  "pos": number,
}