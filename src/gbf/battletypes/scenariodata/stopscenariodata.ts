import { GenericScenarioData } from './genericscenariodata';
import { Actor } from './mechanics/actor';
import { ScenarioCommand } from './scenariocommand';

export interface StopScenarioData extends GenericScenarioData {
  'cmd': ScenarioCommand.STOP;
  'to': Actor;
  'pos': number;
  'index': number | null | undefined;
}
