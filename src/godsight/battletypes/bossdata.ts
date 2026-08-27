import { GameElementValue } from "../../gbf/battletypes/scenariodata/mechanics/element"

export type GodsightBossData = {
  "name": string,
  "element": GameElementValue
  // "position": number,
  "hpMax": number,
  "hpCurrent": number,
  "maxDiamonds": number,
  "currentDiamonds": number,
}