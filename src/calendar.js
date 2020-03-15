import { getMonthDayList, getMonthWeekDayList, months } from "./dates.js";
import { addMonths } from "../web_modules/date-fns.js";
import { isToday } from "../web_modules/date-fns.js";

import m from "../web_modules/mithril.js";

export const nextPrevDay = setDay => {
  return () =>
    m(
      "div.flex.items-center.justify-between.max-w-sm.w-full",
      m(
        "button.text-xs.bg-blue-500.hover:bg-blue-700.text-white.font-bold.py-1.px-2.leading-tight.rounded",
        { onclick: () => setDay(addMonths(setDay(), -1)) },
        "<"
      ),
      m(
        "h1.mx-2.my-2",
        `${months[setDay().getMonth()]} ${setDay().getFullYear()}`
      ),
      m(
        "button.text-xs.bg-blue-500.hover:bg-blue-700.text-white.font-bold.py-1.px-2.leading-tight.rounded",
        { onclick: () => setDay(addMonths(setDay(), 1)) },
        ">"
      )
    );
};

export const MonthRow = vnode => {
  return {
    view: vnode =>
      m(
        "tr",
        m(`td.pl-2.border${vnode.attrs.tdStyles(null)}`, vnode.attrs.name),
        getMonthDayList(vnode.attrs.day).map(d =>
          m(`td.border${vnode.attrs.tdStyles(d)}`, {
            onclick: vnode.attrs.onClickTd(d)
          })
        )
      )
  };
};

export const Month = () => {
  return {
    view: v =>
      m(
        "table.border-collapse",
        getMonthWeekDayList(v.attrs.day).map(week =>
          m(
            "tr.px-6.py-4",
            week.map(day =>
              m(
                `td.px-1.py-1.text-xs.border${
                  v.attrs.day.getMonth() == day.getMonth()
                    ? v.attrs.tdStyles(day)
                    : ".bg-gray-400"
                }`,
                { onclick: v.attrs.onClickTd(day) },

                m(
                  `span.px-1${isToday(day) ? ".bg-gray-500" : ""}`,
                  day.getDate()
                ),
                v.attrs.dayContent(day)
              )
            )
          )
        )
      )
  };
};

export const Calendar = vnode => {
  var currentDay = new Date();
  let setCurrentDay = v => (v == null ? currentDay : (currentDay = v));
  let nextPrev = nextPrevDay(setCurrentDay);
  return {
    view: () =>
      m(
        "div.flex.flex-col.items-center.max-w-md.mx-auto",
        m(
          "div.flex.flex-col.items-center.p-1",
          nextPrev(),
          m(Month, {
            day: currentDay,
            onClickTd: vnode.attrs.onClickTd,
            tdStyles: vnode.attrs.tdStyles,
            dayContent: vnode.attrs.dayContent
          })
        )
      )
  };
};
