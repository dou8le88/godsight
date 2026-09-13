import { BattleStats } from "./battlestats";
import { BattleProgressStatus } from "./battleprogressstatus";
import { GodsightBossData } from "./bossdata";
import { GodsightPartyFormationData } from "./partyformationdata";
import { TurnData } from "./turndata";
import { GodsightSummonData } from "./summondata";

export type GodsightBattleData = {
  "raidId": number,
  "questId": string,
  "IsCoopRaid": boolean,
  "isHost": boolean,
  "currentTurn": number,
  "updateTurnTo"?: number,
  "honors": number,
  "fatedChainGauge": number,
  "battleProgressStatus": BattleProgressStatus,
  "expirationTime": number,
  "lastUpdated": number,
  "party": GodsightPartyFormationData,
  "boss": GodsightBossData[],
  "battleStats": BattleStats,
  "turnData": { [key: number | string]: TurnData },
}