import { ScenarioData } from './scenariodata';
import { ScenarioCommand } from './scenariocommand';
import { z } from 'zod';

export const PotionsChangedScenarioData = ScenarioData.extend({
  'cmd': z.literal(ScenarioCommand._POTIONS_CHANGED),
  'small': z.coerce.number(),
  'large': z.coerce.number(),
}).strip();
