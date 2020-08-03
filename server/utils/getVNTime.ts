import moment from "moment";

export default function getVNTime(date: Date | moment.Moment, format = "LLLL"): string {
  return moment(date).locale("vi").format(format);
}