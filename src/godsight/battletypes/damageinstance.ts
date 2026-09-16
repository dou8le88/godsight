import { GameElementValue } from "../../gbf/battletypes/scenariodata/mechanics/element"

export interface DamageInstance {
  "element": GameElementValue,
  "receiverName": string,
  "receiverIndex": number,
  "value": number,
  "receiverHpAfterDamage": number,
  "critical": boolean,
  "miss": number,
  "guarded": boolean
}

