import { GodsightBattleData } from "../battletypes/battledata";

export interface GodsightStorage {
  "battles": Record<string | number, GodsightBattleData>
}