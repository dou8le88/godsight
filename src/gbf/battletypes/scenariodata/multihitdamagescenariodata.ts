import { GameElement, GameElementValue } from "./mechanics/element";
import { Actor } from "./mechanics/actor";
import { ScenarioCommand } from "./scenariocommand";
import { GenericScenarioData } from "./genericscenariodata";
import { SkillOrDebuffDamageInstance } from "./individualdamageinstance";

export interface TotalDamageDealt {
  "attr": GameElementValue,
  /**
   * Individual digits of total damage dealt, use `TotalDamageDealt.getTotal()` for convenience.
   */
  "split": string[]
}

export class TotalDamageDealt {
  static getTotal(d: TotalDamageDealt): number {
    return Number.parseInt(d.split.join(""));
  }
}


export type MultihitDamageScenarioData = GenericScenarioData & {
  "cmd": ScenarioCommand.DAMAGE_DEALT_MULTIHIT,
  "color": GameElementValue,
  "to": Actor,
  "list": SkillOrDebuffDamageInstance[][],
  "total": TotalDamageDealt[],
}
