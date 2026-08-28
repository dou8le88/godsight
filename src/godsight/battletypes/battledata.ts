import { BattleAction } from "./battleaction";
import { BattleProgressStatus } from "./battlestatus";
import { GodsightBossData } from "./bossdata";
import { GodsightPartyFormationData } from "./partyformationdata";

export type GodsightBattleData = {
  "raidId": number,
  "questId": string,
  "IsCoopRaid": boolean,
  "isHost": boolean,
  "currentTurn": number,
  "honors": number,
  "fatedChainGauge": number,
  "battleProgressStatus": BattleProgressStatus,
  "expirationTime": number,
  "party": GodsightPartyFormationData,
  "boss": GodsightBossData[],
  "turnData": { [key: number]: BattleAction[] },
}