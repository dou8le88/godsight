import { ScenarioData } from './scenariodata';
import { GameElementSchema } from './mechanics/element';
import { Actor } from './mechanics/actor';
import { ScenarioCommand } from './scenariocommand';
import { z } from 'zod';

const ChargedAttackDamageInstance = z.object({
  'pos': z.coerce.number(),
  'split': z.array(
    z.union([
      z.literal('0'),
      z.literal('1'),
      z.literal('2'),
      z.literal('3'),
      z.literal('4'),
      z.literal('5'),
      z.literal('6'),
      z.literal('7'),
      z.literal('8'),
      z.literal('9'),
    ]),
  ),
  'attr': GameElementSchema,
  'count': z.coerce.number(),
});

type ChargedAttackDamageInstance = z.infer<typeof ChargedAttackDamageInstance>;

const ChargedAttackPartitionedDamageInstance = z.object({
  'attr': GameElementSchema,
  'critical': z.union([z.boolean(), z.stringbool()]),
  'hp': z.coerce.number(),
});

const ChargedAttackPartitionedDamage = z.object({
  'damage': z.array(ChargedAttackPartitionedDamageInstance),
});

export const ChargedAttackScenarioData = ScenarioData.extend({
  'cmd': z.union([
    z.literal(ScenarioCommand.CHARACTER_CHARGED_ATTACK),
    z.literal(ScenarioCommand.MC_CHARGED_ATTACK),
  ]),
  'name': z.string(),
  'pos': z.coerce.number(),
  'num': z.coerce.number(),
  'target': z.enum(Actor),
  'to': z.coerce.number(),
  'count': z.coerce.number(),
  'attr': GameElementSchema,
  'total': z.optional(z.array(ChargedAttackDamageInstance)),
  'list': z.optional(z.array(ChargedAttackPartitionedDamage)),
}).strip();

export class ChargedAttackDamageInstanceHelper {
  static getTotal(i: ChargedAttackDamageInstance): number {
    return Number(i.split.join(''));
  }
}
