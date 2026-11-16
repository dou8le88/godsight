import { GameElementSchema } from './mechanics/element';
import { ScenarioCommand } from './scenariocommand';
import { ScenarioData } from './scenariodata';
import { z } from 'zod';

export const SummonDamageInstance = z.object({
  'pos': z.coerce.number(),
  'value': z.coerce.number(),
  'hp': z.coerce.number(),
  'critical': z.coerce.boolean(),
  'guard': z.coerce.boolean(),
  'color': GameElementSchema,
});

export type SummonDamageInstance = z.infer<typeof SummonDamageInstance>;

export const SummonDamageDescription = z.object({
  'damage': z.union([
    z.array(SummonDamageInstance),
    z.record(z.coerce.number(), SummonDamageInstance),
  ]),
});

export const SummonScenarioData = ScenarioData.extend({
  'cmd': z.literal(ScenarioCommand.SUMMON),
  'name': z.string(),
  'list': z.array(SummonDamageDescription),
}).strip();
