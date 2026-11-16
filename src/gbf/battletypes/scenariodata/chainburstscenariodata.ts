import { ScenarioData } from './scenariodata';
import { ScenarioCommand } from './scenariocommand';
import { z } from 'zod';

export const ChainBurstScenarioData = ScenarioData.extend({
  'cmd': z.literal(ScenarioCommand.CHAIN_BURST),
  'chain_num': z.coerce.number(),
}).strip();
