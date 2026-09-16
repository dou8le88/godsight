import { GenericScenarioData } from "./genericscenariodata";
import { Actor } from "./mechanics/actor";
import { ScenarioCommand } from "./scenariocommand";


export interface ChargeAttackMeterChangedScenarioData extends GenericScenarioData {
  "cmd": ScenarioCommand.CA_METER_CHANGED,
  "to": Actor,
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