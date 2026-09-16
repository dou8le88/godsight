import { StatusType } from "./mechanics/statustype"
import { ScenarioCommand } from "./scenariocommand"
import { GenericScenarioData } from "./genericscenariodata"

export interface AppliedStatus {
  /**
   * Party slot that received the status.
   */
  "pos": number,
  "type": StatusType,
  /**
   * Name of the buff or debuff.
   */
  "text": string,
  /**
   * Status ID.
   */
  "status": string,
  "miss"?: number,
  "dispel"?: number,
}

export interface MessageData {
  "boss"?: AppliedStatus[][],
  "player"?: Record<string, AppliedStatus[]>,
}

export interface MessageScenarioData extends GenericScenarioData {
  "cmd": ScenarioCommand.MESSAGE,
  "data": MessageData,
}