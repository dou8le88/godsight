import { GameElementValue } from "../../gbf/battletypes/scenariodata/mechanics/element"

export type DamageInstance = {
  "element": GameElementValue,
  "position": number,
  "currentHit": number,
  "value": number,
  "targetHpAfterDamage": number,
  "critical": boolean,
  "miss": number,
  "guarded": boolean
}

