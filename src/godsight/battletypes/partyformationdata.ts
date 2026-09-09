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

export class PartyFormationHelper {
  static getNameOfFrontlineCharacterInPosition(formation: GodsightPartyFormationData, position: string | number): string {
    const characterIndex = formation["frontline"][position];
    if (characterIndex) {
      const character = formation["members"][characterIndex];
      if (character) {
        return character["name"];
      } else {
        console.error(`No party member at ${characterIndex} when looking up character name!`);
        return "Unknown2";
      }
    } else {
      console.error(`No character at ${position} when looking up character name!`);
      return "Unknown";
    }
  }
}