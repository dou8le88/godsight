import { GameElementValue } from "../../gbf/battletypes/scenariodata/mechanics/element"
import { Proficiency } from "../../gbf/battletypes/scenariodata/mechanics/proficiency"

export type GodsightPartyFormationData = {
  "partyMemberCount": number,
  "frontline": number[],
  "backline": number[],
  "members": GodsightPartyMemberData[],
}

export type GodsightPartyMemberData = {
  "name": string,
  /**
   * MC's is always "1".
   */
  "characterId": string,
  "isMC": boolean,
  /**
   * Portrait filename to be used in the URL.
   */
  "portraitImageId": string,
  "hpMax": number,
  "hp": number,
  "meter": number,
  "meterMax": number,
  "element": GameElementValue,
  "weaponProficiency": Proficiency[],
  "alive": boolean,
  "buffCount": number,
  "debuffCount": number,
  "canBeResurrected": boolean,
  "isGuarding": boolean,
  "canGuard": boolean,
  "isVanished": boolean,
}