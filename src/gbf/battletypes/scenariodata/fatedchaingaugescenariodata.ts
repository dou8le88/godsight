import { ScenarioData } from './scenariodata';
import { ScenarioCommand } from './scenariocommand';
import { z } from 'zod';

export const FatedChainGaugeScenarioData = ScenarioData.extend({
  'cmd': z.literal(ScenarioCommand.FATED_CHAIN_GAUGE_CHANGE),
  'value': z.coerce.number(),
}).strip();
