import {
  eachWeekOfInterval,
  eachDayOfInterval,
  startOfWeek,
  lastDayOfWeek,
  startOfMonth,
  lastDayOfMonth
} from "../web_modules/date-fns.js";

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export function getMonthWeekDayList(d) {
  return eachWeekOfInterval({
    start: startOfMonth(d),
    end: lastDayOfMonth(d)
  }).map(d =>
    eachDayOfInterval({ start: startOfWeek(d), end: lastDayOfWeek(d) })
  );
}

export function getMonthDayList(d) {
  return eachDayOfInterval({ start: startOfMonth(d), end: lastDayOfMonth(d) });
}

function pad(number) {
  if (number < 10) {
    return "0" + number;
  }
  return number;
}

export function toISODateString(d) {
  return (
    d.getUTCFullYear() +
    "-" +
    pad(d.getUTCMonth() + 1) +
    "-" +
    pad(d.getUTCDate())
  );
}
