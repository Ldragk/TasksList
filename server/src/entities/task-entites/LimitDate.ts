import { numberOfDaysInTheMonth } from "../../use-cases/notifications-cases/functions/numberOfDaysInTheMonth";

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
      Number(date[0]) <= numberOfDaysInTheMonth(this.value) &&
      Number(date[1]) >= 1 &&
      Number(date[1]) <= 12 &&
      Number(date[2]) >= new Date().getFullYear()
    );
  }

  constructor(getDate: string) {
    const arrayDate = getDate.split("/");
    const isDateLengthValid = this.validadeDateLength(arrayDate);

    if (!isDateLengthValid) {
      throw new Error(
        `Date must be in the format: mm/dd/yyyy, where mm to be between 1 and 12, 
        dd to be between 1 and lasted day in the month and yyyy to be greater 
        than or equal to the current year`
      );
    }

    this.month = Number(arrayDate[0]);
    this.day = Number(arrayDate[1]);
    this.year = Number(arrayDate[2]);
  }
}
