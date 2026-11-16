import { ScenarioData } from './scenariodata';
import { ScenarioCommand } from './scenariocommand';
import { z } from 'zod';

export const TurnChangeScenarioData = ScenarioData.extend({
  'cmd': z.literal(ScenarioCommand.TURN_CHANGE),
  'turn': z.coerce.number(),
}).strip();
