import { ScenarioData } from './scenariodata';
import { Actor } from './mechanics/actor';
import { ScenarioCommand } from './scenariocommand';
import { z } from 'zod';

export const AttackPhaseTurnScenarioData = ScenarioData.extend({
  'cmd': z.literal(ScenarioCommand.TURN),
  'mode': z.enum(Actor),
}).strip();
