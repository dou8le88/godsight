import { GenericScenarioData } from "./genericscenariodata";
import { Target } from "./mechanics/target";
import { ScenarioCommand } from "./scenariocommand";


export type ChargeAttackMeterChangedScenarioData = GenericScenarioData & {
  "cmd": ScenarioCommand.CA_METER_CHANGED,
  "to": Target,
  "pos": number,
  /**
   * New meter value.
   * TODO: bosses seem to calc this weird, looks like they start at max and count down to 0?
   */
  "value": number,
  /**
   * TODO: What is this? Seems to usually be empty.
   */
  "max": string,
}