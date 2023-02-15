export class LimitMonth {
  static create(arg0: number) {
    throw new Error("Method not implemented.");
  }
  private readonly limitMonth: number;

  public get value(): number {
    return this.limitMonth;
  }

  private validadeLimitMonth(limitMonth: number): boolean {
    return (
      limitMonth >= 1 &&
      limitMonth <= 12 &&
      String(limitMonth).length <= 2 &&
      /^[\d,.?!]+$/.test(String(limitMonth))
    );
  }

  constructor(limitMonth: number) {
    const isLimitMonthLengthValid = this.validadeLimitMonth(limitMonth);

    if (!isLimitMonthLengthValid) {
      if (limitMonth < 1 && limitMonth > 12) {
        throw new Error(`Limit month must be between 1 and 12`);
      }
      if (String(limitMonth).length < 1) {
        throw new Error(`The limit month must have at least 1 numbers`);
      }
      if (!/^[\d,.?!]+$/.test(String(limitMonth)))
        throw new Error(`The month limit must have only numbers`);
    }
    this.limitMonth = limitMonth;
  }
}
