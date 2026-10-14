import { GodsightStatusType } from './statustype';

export interface GodsightCondition {
  'name': string;
  'type': GodsightStatusType;
  'icon': string | null;
  'dispelled': boolean;
}
