import { isToday } from "../web_modules/date-fns.js";
import { getMonthDayList, toISODateString } from "./dates.js";
import { nextPrevDay, MonthRow, Calendar } from "./calendar.js";

import m from "../web_modules/mithril.js";

let onClickTd = t => date => {
  let s = toISODateString(date);
  return () => t.set(s, !t.get(s, false));
};

let tdStyles = t => date => {
  let styleDefault = "";
  if (date !== null) {
    let s = toISODateString(date);
    return t.get(s, false) ? ".bg-green-400" : styleDefault;
  } else {
    return styleDefault;
  }
};

let dayContent = day => {
  return m("div.px-6.py-3", "");
};

export const HabitCalendar = vnode => {
  return {
    view: () =>
      m(
        "div.mt-5",
        m("h1.text-xl.text-center.underline", vnode.attrs.t.name),
        m(Calendar, {
          onClickTd: onClickTd(vnode.attrs.t),
          tdStyles: tdStyles(vnode.attrs.t),
          dayContent
        })
      )
  };
};

export const HabitTable = vnode => {
  var currentDay = new Date();
  let setCurrentDay = v => (v == null ? currentDay : (currentDay = v));
  let nextPrev = nextPrevDay(setCurrentDay);

  let thStyles = "th.font-normal.py-1";
  return {
    view: vnode =>
      m(
        "div.flex.flex-col.items-center.max-w-md.mx-auto",
        m(
          "div.flex.flex-col.items-center.p-1",
          nextPrev(),
          m(
            "table.w-full.table-fixed.border-collapse",
            m(
              "thead",
              m(
                "tr",
                m(`${thStyles}.w-20`),
                getMonthDayList(currentDay).map(d =>
                  m(
                    `${thStyles}.w-8${isToday(d) ? ".bg-gray-500" : ""}`,
                    d.getDate()
                  )
                )
              )
            ),
            m(
              "tbody",
              vnode.attrs.habits.map(t =>
                m(MonthRow, {
                  name: t.name,
                  day: currentDay,
                  onClickTd: onClickTd(t),
                  tdStyles: tdStyles(t)
                })
              )
            )
          )
        )
      )
  };
};
