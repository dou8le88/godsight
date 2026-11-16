import { ScenarioData } from './scenariodata';
import { GameElementSchema } from './mechanics/element';
import { AttackAccuracyResult } from './mechanics/attackaccuracyresult';
import { Actor } from './mechanics/actor';
import { ScenarioCommand } from './scenariocommand';
import { z } from 'zod';

const BossSpecialAttackDamageInstance = z.object({
  'attr': GameElementSchema,
  'pos': z.coerce.number(),
  /**
   * Amount of damage.
   */
  'value': z.coerce.number(),
  /**
   * Character HP after taking damage.
   */
  'hp': z.coerce.number(),
  'critical': z.union([z.boolean(), z.stringbool()]),
  'miss': z.enum(AttackAccuracyResult),
  'guard': z.union([z.boolean(), z.stringbool()]),
});

const BossSpecialAttackDamageSummary = z.object({
  'damage': z.array(BossSpecialAttackDamageInstance),
});

export const BossSpecialAttackScenarioData = ScenarioData.extend({
  'cmd': z.literal(ScenarioCommand.BOSS_SPECIAL_ATTACK),
  'name': z.string(),
  /**
   * Source of the special attack.
   */
  'pos': z.coerce.number(),
  'num': z.coerce.number(),
  'target': z.enum(Actor),
  'count': z.coerce.number(),
  'attr': GameElementSchema,
  'list': z.optional(z.array(BossSpecialAttackDamageSummary)),
}).strip();
