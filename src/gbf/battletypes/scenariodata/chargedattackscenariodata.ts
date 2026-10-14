import { GenericScenarioData } from './genericscenariodata';
import { GameElementValue } from './mechanics/element';
import { Actor } from './mechanics/actor';
import { ScenarioCommand } from './scenariocommand';

export interface ChargedAttackScenarioData extends GenericScenarioData {
  'cmd':
    | ScenarioCommand.CHARACTER_CHARGED_ATTACK
    | ScenarioCommand.MC_CHARGED_ATTACK;
  'name': string;
  'pos': number;
  'num': number;
  'target': Actor;
  'to': number;
  'chain': string;
  'count': number;
  'attr': GameElementValue;
  'total'?: ChargedAttackDamageInstance[];
  'list'?: ChargedAttackPartitionedDamage[];
}

export interface ChargedAttackPartitionedDamage {
  'damage': ChargedAttackPartitionedDamageInstance[];
}

export interface ChargedAttackPartitionedDamageInstance {
  'attr': GameElementValue;
  'critical': boolean;
  'hp': number;
}

export interface ChargedAttackDamageInstance {
  'pos': number;
  'split': string[];
  'attr': GameElementValue;
  'count': number;
}

export class ChargedAttackDamageInstanceHelper {
  static getTotal(i: ChargedAttackDamageInstance): number {
    return Number(i.split.join(''));
  }
}
