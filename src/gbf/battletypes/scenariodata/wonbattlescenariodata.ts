import { GenericScenarioData } from './genericscenariodata';
import { ScenarioCommand } from './scenariocommand';

export interface WonBattleScenarioData extends GenericScenarioData {
  'cmd': ScenarioCommand.WON_BATTLE;
  'mode': number;
  /**
   * Next wave's raid ID.
   */
  'raid_id': number;
  'is_last_raid': boolean;
  'is_finisher': number;
}
