import { GenericScenarioData } from './genericscenariodata';
import { ScenarioCommand } from './scenariocommand';

export interface WonBattleScenarioData extends GenericScenarioData {
  'cmd': ScenarioCommand.WON_BATTLE;
  /**
   * TODO: what is this?
   */
  'mode': number;
  'raid_id': number;
  'is_last_raid': boolean;
  /**
   * TODO: Numeric boolean?
   */
  'is_finisher': number;
  // "next_url": string,
}
