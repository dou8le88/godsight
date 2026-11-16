import { ScenarioData } from './scenariodata';
import { ScenarioCommand } from './scenariocommand';
import { z } from 'zod';

export const ImageChangeScenarioData = ScenarioData.extend({
  'cmd': z.literal(ScenarioCommand.IMAGE_CHANGE),
  'pos': z.coerce.number(),
  'image_id': z.string(),
}).strip();
