import { GameElementValue } from "../../gbf/battletypes/scenariodata/mechanics/element"

export type GodsightBossData = {
  "name": string,
  "element": GameElementValue,
  "hpMax": number,
  "hpCurrent": number,
  "maxDiamonds": number,
  "currentDiamonds": number,
}