import { Target } from "../../gbf/battletypes/scenariodata/mechanics/target";
import { ActionType } from "./actiontype";
import { BattleAction } from "./battleaction";

export type CAMeterChangedAction = BattleAction & {
  "action": ActionType.CA_METER_CHANGED,
  "target": Target,
  "position": number,
  "newValue": number,
  /**
   * Calculated difference between last known meter value and the new value.
   */
  "change": number,
  // "max": "",
}