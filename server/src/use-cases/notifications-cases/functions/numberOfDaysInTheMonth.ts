export function numberOfDaysInTheMonth(date: string): number {
  let MonthDays: number = 31;
  const getMonth: string = String(new Date(date)).split(" ")[1];
  if (
    getMonth === "Apr" ||
    getMonth === "Jun" ||
    getMonth === "Sep" ||
    getMonth === "Nov"
  ) {
    MonthDays = 30;
  } else if (getMonth === "Feb") {
    MonthDays = 28;
  }
  return MonthDays;
}
