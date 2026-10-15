import { Actor } from './mechanics/actor';
import { ScenarioCommand } from './scenariocommand';
import { GenericScenarioData } from './genericscenariodata';

export interface Condition {
  'status': string;
  'display_priority': number | string;
}

export interface ConditionSummary {
  'buff'?: Condition[];
  'debuff'?: Condition[];
  /**
   * TODO: Weird value, hard to correlate to any actual logic.
   */
  'num'?: number;
  /**
   * Shield HP if a status effect described by this condition granted a shield.
   */
  'coating_value'?: number;
}

export interface ConditionChangedScenarioData extends GenericScenarioData {
  'cmd': ScenarioCommand._CONDITION;
  'to': Actor;
  'pos': number;
  'condition': ConditionSummary;
}
