import { GodsightBattleData } from "../battletypes/battledata";
import { GodsightSettings } from "../godsightsettings";

export interface GodsightStorage {
  "settings": GodsightSettings,
  "battles": Record<string | number, GodsightBattleData>
}