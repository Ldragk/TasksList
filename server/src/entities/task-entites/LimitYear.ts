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
      limitYear >= new Date().getFullYear() && String(limitYear).length <= 4
    );
  }

  constructor(limitYear: number) {
    const isLimitYearLengthValid = this.validadeLimitYearLength(limitYear);

    if (!isLimitYearLengthValid) {
      throw new Error(
        `Limit year must be equal to or greater than ${new Date().getFullYear()}`
      );
    }

    this.limitYear = limitYear;
  }
}
