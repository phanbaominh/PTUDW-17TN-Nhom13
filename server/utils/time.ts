import moment from "moment";

export function getVNTime(date: Date | moment.Moment, format = "LLLL"): string {
  return moment(date).locale("vi").format(format);
}

export function getNextFreeDate(): Date {
  let currentDate = moment();
  while (currentDate.day() === 0 || currentDate.day() === 6) {
    currentDate = currentDate.add(1, "d");
  }
  return currentDate.toDate();
}
