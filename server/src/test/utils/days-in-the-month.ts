export function daysInTheMonth(month: number) {
  let MonthDays = 31;

  if (month === 2) {
    return (MonthDays = 28);
  }
  if (month === 4 || month === 6 || month === 9 || month === 11) {
    return (MonthDays = 30);
  }
  return MonthDays;
}
