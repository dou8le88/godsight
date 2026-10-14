import { GameElementValue } from './mechanics/element';
import { Actor } from './mechanics/actor';
import { ScenarioCommand } from './scenariocommand';
import { GenericScenarioData } from './genericscenariodata';
import { SkillOrDebuffDamageInstance } from './individualdamageinstance';

export interface DamageScenarioData extends GenericScenarioData {
  'cmd': ScenarioCommand.DAMAGE_DEALT;
  'color': GameElementValue;
  'to': Actor;
  'list': SkillOrDebuffDamageInstance[];
  'turn_end'?: boolean;
}
