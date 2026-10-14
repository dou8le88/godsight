import { GenericScenarioData } from './genericscenariodata';
import { Actor } from './mechanics/actor';
import { ScenarioCommand } from './scenariocommand';

export interface AttackPhaseTurnScenarioData extends GenericScenarioData {
  'cmd': ScenarioCommand.TURN;
  'mode': Actor;
}
