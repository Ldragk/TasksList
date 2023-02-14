import { numberOfDaysInTheMonth } from "../../use-cases/notifications-cases/functions/numberOfDaysInTheMonth";

export class LimitDay {
  private readonly limitDay: number;

  public get value(): number {
    return this.limitDay;
  }

  private validadeLimitDay(limitDay: number): boolean {
    return limitDay >= 1 && limitDay <= numberOfDaysInTheMonth();
  }

  constructor(limitDay: number) {
    const isLimitDayLengthValid = this.validadeLimitDay(limitDay);

    if (!isLimitDayLengthValid) {
      throw new Error(
        `Limit day must be between 1 and ${numberOfDaysInTheMonth()} characters`
      );
    }

    this.limitDay = limitDay;
  }
}
