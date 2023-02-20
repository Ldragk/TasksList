export function numberOfDaysInTheMonth(date: string) {
  let MonthDays: number = 31;
  const cathMonth: string = String(new Date(date)).split(" ")[1];
  if (
    cathMonth === "Apr" ||
    cathMonth === "Jun" ||
    cathMonth === "Sep" ||
    cathMonth === "Nov"
  ) {
    MonthDays = 30;
  } else if (cathMonth === "Feb") {
    MonthDays = 28;
  }
  return MonthDays;
}
