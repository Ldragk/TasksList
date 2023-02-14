export class LimitYear {
  private readonly limitYear: number;

  public get value(): number {
    return this.limitYear;
  }

  private validadeLimitYearLength(limitYear: number): boolean {
    return limitYear >= new Date().getFullYear();
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
