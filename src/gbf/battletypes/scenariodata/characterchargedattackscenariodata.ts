import { GenericScenarioData } from "./genericscenariodata";
import { GameElementValue } from "./mechanics/element";
import { Target } from "./mechanics/target";
import { ScenarioCommand } from "./scenariocommand";


export interface CharacterChargedAttackScenarioData extends GenericScenarioData {
  "cmd": ScenarioCommand.CHARACTER_CHARGED_ATTACK;
  "name": string;
  "pos": number;
  "num": number;
  "target": Target;
  "to": number;
  "chain": string;
  "count": number;
  "attr": GameElementValue,
  "total": ChargedAttackDamageInstance[],
  "list": ChargedAttackPartitionedDamage[],
}

export type ChargedAttackPartitionedDamage = {
  "damage": ChargedAttackPartitionedDamageInstance[],
}

/**
 * There are a lot of fields on this but this type of damage instance is only used
 * for if you have CA skip off, to display all the individual "hits".
 * Thus we only care about the boss's HP at the end of the CA.
 */
export type ChargedAttackPartitionedDamageInstance = {
  "hp": number,
}

export class CharacterChargedAttackScenarioData {
  static getHpAfterDamage(d: CharacterChargedAttackScenarioData): number {
    return d.list.at(-1)!.damage.at(-1)!.hp;
  }
}

export interface ChargedAttackDamageInstance {
  "pos": number;
  "split": string[];
  "attr": GameElementValue;
  "count": number;
}

export class ChargedAttackDamageInstance {
  static getTotal(i: ChargedAttackDamageInstance): string {
    return i.split.join("");
  }
}