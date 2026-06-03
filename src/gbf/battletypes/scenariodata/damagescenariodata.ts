import { GameElementValue } from "./mechanics/element";
import { Target } from "./mechanics/target";
import { ScenarioCommand } from "./scenariocommand";
import { GenericScenarioData } from "./genericscenariodata";
import { SkillOrDebuffDamageInstance } from "./individualdamageinstance";

export type DamageScenarioData = GenericScenarioData & {
  "cmd": ScenarioCommand.DAMAGE_DEALT,
  "color": GameElementValue,
  "to": Target,
  "list": SkillOrDebuffDamageInstance[],
}
