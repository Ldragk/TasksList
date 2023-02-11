export function convertExcessDaysAtTheTurnOfTheMonth(
  numberOfDaysInTheMonth: number,
  daysInAdvanceForNotification: number
) {
  const getDate: number = new Date().getDate();
  let getMonth: number = new Date().getMonth();
  const getYear: number = new Date().getFullYear();
  let getDay: number = getDate;

  if (getDate === numberOfDaysInTheMonth) {
    getDay = 0 + Number(daysInAdvanceForNotification);
    getMonth += 1;
  } else if (getDate === (numberOfDaysInTheMonth % getDate) + 1) {
    getDay =
      (numberOfDaysInTheMonth % getDay) + Number(daysInAdvanceForNotification);

    if (getDay >= numberOfDaysInTheMonth) {
      getDay = (getDay % numberOfDaysInTheMonth) + 1;
      getMonth += 1;
    }
  } else {
    getDay += Number(daysInAdvanceForNotification);

    if (getDay >= numberOfDaysInTheMonth) {
      getDay = getDay % numberOfDaysInTheMonth;
      getMonth += 1;
    }
  }
  const date = `${getMonth + 1}/${getDay}/${getYear}`;
  return date;
}
