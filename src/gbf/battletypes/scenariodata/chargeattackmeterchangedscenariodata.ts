import { GenericScenarioData } from './genericscenariodata';
import { Actor } from './mechanics/actor';
import { ScenarioCommand } from './scenariocommand';

export interface ChargeAttackMeterChangedScenarioData extends GenericScenarioData {
  'cmd': ScenarioCommand.CA_METER_CHANGED;
  'to': Actor;
  'pos': number;
  'value': number;
  'max': string;
}
