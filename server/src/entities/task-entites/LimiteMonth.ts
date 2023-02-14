export class LimitMonth {
  private readonly limitMonth: number;

  public get value(): number {
    return this.limitMonth;
  }

  private validadeLimitMonth(limitMonth: number): boolean {
    return limitMonth >= 1 && limitMonth <= 12;
  }

  constructor(limitMonth: number) {
    const isLimitMonthLengthValid = this.validadeLimitMonth(limitMonth);

    if (!isLimitMonthLengthValid) {
      throw new Error(`Limit month must be between 1 and 12 characters`);
    }

    this.limitMonth = limitMonth;
  }
}
