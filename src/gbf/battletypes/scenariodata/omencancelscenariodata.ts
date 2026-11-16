import { ScenarioData } from './scenariodata';
import { ScenarioCommand } from './scenariocommand';
import { z } from 'zod';

export const OmenCancelScenarioData = ScenarioData.extend({
  'cmd': z.literal(ScenarioCommand.OMEN_CANCEL),
  'pos': z.coerce.number(),
}).strip();
