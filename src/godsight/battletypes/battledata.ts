import { BattleStats } from './battlestats';
import { BattleProgressStatus } from './battleprogressstatus';
import { GodsightBossData } from './bossdata';
import { GodsightPartyFormationData } from './partyformationdata';
import { TurnData } from './turndata';

export interface GodsightBattleData {
  'raidId': number;
  'updateRaidIdTo'?: number;
  'questId': string;
  'IsCoopRaid': boolean;
  'isHost': boolean;
  'currentTurn': number;
  'updateTurnTo'?: number;
  'currentWave': number;
  'totalWaves': number;
  'abilityTurns': number[];
  'turnsWithSkippedOrRecordedAttackActions': number[];
  'honors': number;
  'fatedChainGauge': number;
  'battleProgressStatus': BattleProgressStatus;
  'expirationTime': number;
  'lastUpdated': number;
  'party': GodsightPartyFormationData;
  'boss': GodsightBossData[];
  'battleStats': BattleStats;
  'turnData': Record<number | string, TurnData>;
}
