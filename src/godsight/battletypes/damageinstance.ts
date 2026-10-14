import { AttackAccuracyResult } from '../../gbf/battletypes/scenariodata/mechanics/attackaccuracyresult';
import { NumericGameElement } from '../../gbf/battletypes/scenariodata/mechanics/element';

export interface DamageInstance {
  'element': NumericGameElement;
  'receiverName': string;
  'receiverIndex': number;
  'value': number;
  'receiverHpAfterDamage'?: number;
  'critical': boolean;
  'miss': AttackAccuracyResult | boolean;
  'guarded': boolean;
}
