import { GameElementValue } from "./mechanics/element";
import { Actor } from "./mechanics/actor";
import { ScenarioCommand } from "./scenariocommand";
import { GenericScenarioData } from "./genericscenariodata";
import { SkillOrDebuffDamageInstance } from "./individualdamageinstance";

export type MultihitDamageScenarioData = GenericScenarioData & {
  "cmd": ScenarioCommand.DAMAGE_DEALT_MULTIHIT,
  "color": GameElementValue,
  "to": Actor,
  "list": SkillOrDebuffDamageInstance[][],
}
