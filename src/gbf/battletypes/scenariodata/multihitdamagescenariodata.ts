import { GameElementSchema } from './mechanics/element';
import { Actor } from './mechanics/actor';
import { ScenarioCommand } from './scenariocommand';
import { ScenarioData } from './scenariodata';
import { SkillOrDebuffDamageInstance } from './individualdamageinstance';
import { z } from 'zod';

export const MultihitDamageScenarioData = ScenarioData.extend({
  'cmd': z.literal(ScenarioCommand.DAMAGE_DEALT_MULTIHIT),
  'color': GameElementSchema,
  'to': z.enum(Actor),
  'list': z.union([
    z.array(z.array(SkillOrDebuffDamageInstance)),
    z.record(z.coerce.number(), z.array(SkillOrDebuffDamageInstance)),
  ]),
}).strip();
