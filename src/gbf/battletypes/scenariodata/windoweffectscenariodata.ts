import { ScenarioData } from './scenariodata';
import { ScenarioCommand } from './scenariocommand';
import { z } from 'zod';

export const WindowEffectScenarioData = ScenarioData.extend({
  'cmd': z.literal(ScenarioCommand.WINDOW_EFFECT),
  'name': z.string(),
}).strip();
