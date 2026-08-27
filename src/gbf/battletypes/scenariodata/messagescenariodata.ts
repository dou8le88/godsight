import { StatusType } from "./mechanics/statustype"
import { ScenarioCommand } from "./scenariocommand"
import { GenericScenarioData } from "./genericscenariodata"

export type AppliedStatus = {
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
}

export type MessageData = {
  "boss"?: AppliedStatus[][],
  "player"?: { [key: string]: AppliedStatus[] },
}

export type MessageScenarioData = GenericScenarioData & {
  "cmd": ScenarioCommand.MESSAGE,
  "data": MessageData,
}