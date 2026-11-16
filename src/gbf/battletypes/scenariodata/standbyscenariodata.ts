import { ScenarioData } from './scenariodata';
import { ScenarioCommand } from './scenariocommand';
import { z } from 'zod';

export const StandbyScenarioData = ScenarioData.extend({
  'cmd': z.literal(ScenarioCommand.STANDBY),
  'pos': z.coerce.number(),
  'standby': z.coerce.boolean(), // redundant?
}).strip();
