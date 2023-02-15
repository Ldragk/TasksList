import { numberOfDaysInTheMonth } from "../../use-cases/notifications-cases/functions/numberOfDaysInTheMonth";

export class LimitDay {
  static create(arg0: number) {
    throw new Error("Method not implemented.");
  }
  private readonly limitDay: number;

  public get value(): number {
    return this.limitDay;
  }

  private validadeLimitDay(limitDay: number): boolean {
    return (
      limitDay >= 1 &&
      limitDay <= numberOfDaysInTheMonth() &&
      String(limitDay).length <= 2 &&
      /^[\d,.?!]+$/.test(String(limitDay))
    );
  }

  constructor(limitDay: number) {
    const isLimitDayLengthValid = this.validadeLimitDay(limitDay);

    if (!isLimitDayLengthValid) {
      if (limitDay < 1 && limitDay > numberOfDaysInTheMonth()) {
        throw new Error(
          `Limit day must be between 1 and ${numberOfDaysInTheMonth()}`
        );
      }
      if (String(limitDay).length < 1) {
        throw new Error(`The limit day must have at least 1 number`);
      }
      if (!/^[\d,.?!]+$/.test(String(limitDay)))
        throw new Error(`The limit day must have only numbers`);
    }

    this.limitDay = limitDay;
  }
}
