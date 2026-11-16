import { ScenarioData } from './scenariodata';
import { ScenarioCommand } from './scenariocommand';
import { z } from 'zod';

export const PartyChangeScenarioData = ScenarioData.extend({
  'cmd': z.literal(ScenarioCommand.PARTY_CHANGE),
  'main_party_num': z.coerce.number(),
}).strip();
