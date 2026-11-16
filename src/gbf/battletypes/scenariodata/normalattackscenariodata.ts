import { ScenarioData } from './scenariodata';
import { GameElementSchema } from './mechanics/element';
import { AttackAccuracyResult } from './mechanics/attackaccuracyresult';
import { Actor } from './mechanics/actor';
import { ScenarioCommand } from './scenariocommand';
import { z } from 'zod';

export const NormalAttackDamage = z.object({
  'pos': z.coerce.number(),
  'value': z.coerce.number(),
  /**
   * Target HP after receiving this damage.
   */
  'hp': z.coerce.number(),
  'critical': z.coerce.boolean(),
  'miss': z.enum(AttackAccuracyResult),
  'color': z.optional(GameElementSchema),
  'attr': z.optional(GameElementSchema),
  'guard': z.optional(z.coerce.boolean()),
});

export type NormalAttackDamage = z.infer<typeof NormalAttackDamage>;

export const NormalAttackScenarioData = ScenarioData.extend({
  'cmd': z.literal(ScenarioCommand.NORMAL_ATTACK),
  'from': z.enum(Actor),
  'pos': z.coerce.number(),
  'num': z.coerce.number(),
  'color': GameElementSchema,
  'damage': z.union([
    z.array(z.array(NormalAttackDamage)),
    z.record(z.coerce.number(), z.array(NormalAttackDamage)),
  ]),
  /**
   * This field only seems to exist for counters. Since counter commands
   * are fired one at a time instead of as a "triple attack", say, if you counter three times,
   * the client needs to be able to know what attack animation to play for each counter.
   * So the mere existence of this field can be used to tell if a normal attack is a counter.
   */
  'motion': z.optional(z.string()),
}).strip();
