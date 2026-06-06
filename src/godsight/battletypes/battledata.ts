import { BattleAction } from "./battleaction";
import { GodsightBossFormationData } from "./bossformationdata";
import { GodsightPartyFormationData } from "./partyformationdata";

export type GodsightBattleData = {
  "raidId": number,
  "questId": string,
  "IsCoopRaid": boolean,
  "isHost": boolean,
  "turn": number,
  "party": GodsightPartyFormationData,
  "boss": GodsightBossFormationData,
  "actions": BattleAction[],
}