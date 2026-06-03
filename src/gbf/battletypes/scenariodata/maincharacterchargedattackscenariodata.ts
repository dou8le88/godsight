import { ChargedAttackDamageInstance, ChargedAttackPartitionedDamage } from "./characterchargedattackscenariodata";
import { GenericScenarioData } from "./genericscenariodata";
import { GameElementValue } from "./mechanics/element";
import { Target } from "./mechanics/target";
import { ScenarioCommand } from "./scenariocommand";


export interface MainCharacterChargedAttackScenarioData extends GenericScenarioData {
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