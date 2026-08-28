import { Target } from "./mechanics/target";
import { ScenarioCommand } from "./scenariocommand";
import { GenericScenarioData } from "./genericscenariodata";

export type Condition = {
  "status": string,
  "display_priority": number | string;
}

export type ConditionSummary = {
  "buff"?: Condition[],
  "debuff"?: Condition[],
  /**
   * TODO: Weird value, perhaps the original party slot of the affected character at battle start if it's a player?
   * Unsure about when the boss has this value.
   */
  "num"?: number,
}

export type ConditionChangedScenarioData = GenericScenarioData & {
  "cmd": ScenarioCommand._CONDITION,
  "to": Target,
  "pos": number,
  "condition": ConditionSummary,
}

