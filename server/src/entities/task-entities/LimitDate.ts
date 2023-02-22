import { daysInTheMonth } from "../../helpers/DaysInTheMonth";

export class LimitDate {
  static create(arg0: string) {
    throw new Error("Method not implemented.");
  }
  private readonly month: number;
  private readonly day: number;
  private readonly year: number;

  get value(): string {
    return `${this.month}/${this.day}/${this.year}`;
  }

  get dayValue(): number {
    return this.day;
  }

  get monthValue(): number {
    return this.month;
  }

  get yearValue(): number {
    return this.year;
  }

  private validadeDateLength(date: String[]): boolean {
    return (
      date[0].length <= 2 &&
      date[0].length > 0 &&
      date[1].length <= 2 &&
      date[1].length > 0 &&
      date[2].length === 4 &&
      Number(date[0]) >= 1 &&
      Number(date[0]) <= 12 &&
      Number(date[1]) >= 1 &&
      Number(date[1]) <= daysInTheMonth(Number(date[0])) &&
      Number(date[2]) >= new Date().getFullYear()
    );
  }

  constructor(getDate: string) {
    const arrayDate = getDate.split("/");
    const isDateLengthValid = this.validadeDateLength(arrayDate);

    if (!isDateLengthValid) {
      throw new Error(
        `Date must be string and separated by bars "/", with that format: month/day/year. 
        Where 
        "month" to be between 1 and 12, 
        "day" to be between 1 and lasted day in the month and,
        "year" to be greater  than or equal to the current year and have 4 digits.`
      );
    }

    this.month = Number(arrayDate[0]);
    this.day = Number(arrayDate[1]);
    this.year = Number(arrayDate[2]);
  }
}
