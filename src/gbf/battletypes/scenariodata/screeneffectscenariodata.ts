import { GenericScenarioData } from './genericscenariodata';
import { Actor } from './mechanics/actor';
import { ScenarioCommand } from './scenariocommand';

export interface ScreenEffectScenarioData extends GenericScenarioData {
  'cmd': ScenarioCommand._SCREEN_EFFECT;
  'name': string;
  'to'?: Actor;
  'is_fatal_chain'?: boolean;
}
