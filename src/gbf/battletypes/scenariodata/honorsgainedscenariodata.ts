import { ScenarioCommand } from './scenariocommand';
import { ScenarioData } from './scenariodata';
import { z } from 'zod';

export const HonorsGainedScenarioData = ScenarioData.extend({
  'cmd': z.literal(ScenarioCommand.HONORS_GAINED),
  'amount': z.coerce.number(),
}).strip();
