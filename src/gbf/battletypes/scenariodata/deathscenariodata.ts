import { ScenarioData } from './scenariodata';
import { Actor } from './mechanics/actor';
import { ScenarioCommand } from './scenariocommand';
import { z } from 'zod';

export const DeathScenarioData = ScenarioData.extend({
  'cmd': z.union([
    z.literal(ScenarioCommand.DEATH),
    z.literal(ScenarioCommand.STOP),
  ]),
  'to': z.enum(Actor),
  'pos': z.coerce.number(),
  'index': z.number().nullish(),
}).strip();

export type DeathScenario = z.infer<typeof DeathScenarioData>;
