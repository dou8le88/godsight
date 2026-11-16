import { GameElementSchema } from './mechanics/element';
import { AttackAccuracyResult } from './mechanics/attackaccuracyresult';
import { z } from 'zod';

export const SkillOrDebuffDamageInstance = z.object({
  /**
   * Damage value for this hit
   */
  'value': z.coerce.number(),
  /**
   * Target's HP after this instance of damage
   */
  'hp': z.coerce.number(),
  'color': z.optional(GameElementSchema),
  'critical': z.optional(z.union([z.boolean(), z.stringbool()])),
  'miss': z.optional(z.union([z.enum(AttackAccuracyResult), z.boolean()])),
  'guard': z.optional(z.union([z.boolean(), z.stringbool()])),
  'pos': z.coerce.number(),
});

export type SkillOrDebuffDamageInstance = z.infer<
  typeof SkillOrDebuffDamageInstance
>;
