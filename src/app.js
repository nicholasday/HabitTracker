import { create } from "./storage.js";
import { HabitCalendar, HabitTable } from "./habits.js";

import m from "../web_modules/mithril.js";

let habits = [create("one meal"), create("30m exercise")];

var App = {
  view: () =>
    m(
      "div.max-w-md.mx-auto",
      m(HabitTable, { habits }),
      habits.map(t => m(HabitCalendar, { t }))
    )
};

m.mount(document.body, App);
