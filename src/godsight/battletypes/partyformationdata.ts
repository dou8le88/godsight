import { GameElementValue } from '../../gbf/battletypes/scenariodata/mechanics/element';

export interface GodsightPartyFormationData {
  'partyMemberCount': number;
  'frontline': number[];
  'backline': number[];
  'members': GodsightPartyMemberData[];
}

export interface GodsightPartyMemberData {
  'name': string;
  /**
   * MC's is always "1".
   */
  'characterId': string;
  'isMC': boolean;
  /**
   * Portrait filename to be used in the URL.
   */
  'portraitImageId': string;
  'hpMax': number;
  'hp': number;
  'meter': number;
  'meterMax': number;
  'element': GameElementValue;
  'alive': boolean;
  'canBeResurrected': boolean;
  'isVanished': boolean;
}

export class PartyFormationHelper {
  static getNameOfFrontlineCharacterInPosition(
    formation: GodsightPartyFormationData,
    position: number,
  ): string {
    const characterIndex = formation['frontline'][position];
    if (characterIndex !== undefined) {
      return this.getNameOfCharacterAtPartyIndex(formation, characterIndex);
    } else {
      console.error(
        `No character at ${position} when looking up character name!`,
      );
      return 'Unknown';
    }
  }

  static getNameOfCharacterInPosition(
    formation: GodsightPartyFormationData,
    position: number,
  ): string {
    const entireFormation = formation['frontline'].concat(
      formation['backline'],
    );

    const characterIndex = entireFormation[position];

    if (characterIndex !== undefined) {
      return this.getNameOfCharacterAtPartyIndex(formation, characterIndex);
    } else {
      console.error(
        `No character at ${position} when looking up character name!`,
      );
      return 'Unknown';
    }
  }

  static getNameOfCharacterAtPartyIndex(
    formation: GodsightPartyFormationData,
    characterIndex: number,
  ): string {
    const character = formation['members'][characterIndex];
    if (character) {
      return character['name'];
    } else {
      console.error(
        `No party member at ${characterIndex} when looking up character name!`,
      );
      return 'Unknown2';
    }
  }
}
