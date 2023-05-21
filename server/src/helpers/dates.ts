export class Dates {
  months!: number[];
  days!: number[];

  get getDays(): number[] {
    return this.days;
  }

  get getMonths(): number[] {
    return this.months;
  }

  constructor() {
    this.months = [];
    for (let i = 1; i <= 12; i++) {
      this.months.push(i);
    }

    this.days = [];
    for (let i = 1; i <= 31; i++) {
      this.days.push(i);
    }
  }
}
