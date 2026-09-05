import { GodsightStatusType } from "./statustype";

export class GodsightCondition {
  constructor(
    public name: string,
    public type: GodsightStatusType,
    public icon: string,
    public dispelled: boolean,
  ) {
  }
}