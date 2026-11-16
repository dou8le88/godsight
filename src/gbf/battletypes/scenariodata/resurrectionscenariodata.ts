import { ScenarioData } from './scenariodata';
import { ScenarioCommand } from './scenariocommand';
import { z } from 'zod';

export const ResurrectionScenarioData = ScenarioData.extend({
  'cmd': z.literal(ScenarioCommand.RESURRECTION),
  'pos': z.coerce.number(),
  'index': z.coerce.number(),
  'performer': z.coerce.number(),
  'name': z.string(),
  'hp': z.coerce.number(),
  'hpmax': z.coerce.number(),
}).strip();
