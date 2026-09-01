import { GodsightBattleData } from "../battletypes/battledata";
import { GodsightSettings } from "../godsightsettings";

export type GodsightStorage = {
  "settings": GodsightSettings,
  "battles": { [key: string | number]: GodsightBattleData }
}