import { ScenarioData } from './scenariodata';
import { ScenarioCommand } from './scenariocommand';
import { z } from 'zod';

export const FullElixirScenarioData = ScenarioData.extend({
  'cmd': z.literal(ScenarioCommand.FULL_ELIXIR),
}).strip();
