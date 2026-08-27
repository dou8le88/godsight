import { BattleAction } from "./battleaction";
import { GodsightBossData } from "./bossdata";
import { GodsightPartyFormationData } from "./partyformationdata";

export type GodsightBattleData = {
  "raidId": number,
  "questId": string,
  "IsCoopRaid": boolean,
  "isHost": boolean,
  "currentTurn": number,
  "honors": number,
  "party": GodsightPartyFormationData,
  "boss": GodsightBossData[],
  "turnData": { [key: number]: BattleAction[] },
}