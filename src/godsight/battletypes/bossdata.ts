import { GameElementValue } from '../../gbf/battletypes/scenariodata/mechanics/element';

export interface GodsightBossData {
  'name': string;
  'element': GameElementValue;
  'hpMax': number;
  'hpCurrent': number;
  'maxDiamonds': number;
  'currentDiamonds': number;
}
