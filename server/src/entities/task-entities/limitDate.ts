import { daysInTheMonth } from "@src/test/utils/days-in-the-month";

export class LimitDate {  
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

  private validadeDateLength(date: string[]): boolean {    
    
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
      const month = arrayDate[0];
      const day = arrayDate[1];
      const year = arrayDate[2];
      
      const dateFormat = `Format: Date must be a string and separated by slashes '/', with the following format: month/day/year.`;

      const errors = [];

      if (month.length > 2 || month.length === 0 || Number(month) < 1 || Number(month) > 12) {
        errors.push(`- Month must be between 1 and 12.`);
      }

      if (day.length > 2 || day.length === 0 || Number(day) < 1 || Number(day) > daysInTheMonth(Number(month))) {
        errors.push(`- Day must be between 1 and the last day of the respective month.`);
      }

      if (year.length !== 4 || Number(year) < new Date().getFullYear()) {
        errors.push(`- Year must be greater than or equal to the current year and consist of 4 digits.`);
      }

      if (errors.length > 0) {
        throw new Error(`
        Invalid date format!       
        ${dateFormat}     
        ${errors.join('\n')}`);
      }
    }

    this.month = Number(arrayDate[0]);
    this.day = Number(arrayDate[1]);
    this.year = Number(arrayDate[2]);
  }
}
