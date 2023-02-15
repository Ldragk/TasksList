export class LimitYear {
  static create(arg0: number) {
    throw new Error("Method not implemented.");
  }
  private readonly limitYear: number;

  public get value(): number {
    return this.limitYear;
  }

  private validadeLimitYearLength(limitYear: number): boolean {
    return (
      limitYear >= new Date().getFullYear() &&
      String(limitYear).length <= 4 &&
      /^[\d,.?!]+$/.test(String(limitYear))
    );
  }

  constructor(limitYear: number) {
    const isLimitYearLengthValid = this.validadeLimitYearLength(limitYear);

    if (!isLimitYearLengthValid) {
      if (limitYear < new Date().getFullYear()) {
        throw new Error(
          `Limit year must be equal to or greater than ${new Date().getFullYear()}`
        );
      }
      if (String(limitYear).length < 4) {
        throw new Error(`The limit year must have at least 4 numbers`);
      }
      if (!/^[\d,.?!]+$/.test(String(limitYear)))
        throw new Error(`The year limit must have only numbers`);
    }

    this.limitYear = limitYear;
  }
}
