import "./DatePicker.css";
import {
  addDays,
  addMonths,
  compareAsc,
  getDate,
  getDay,
  getMonth,
  getWeeksInMonth,
  getYear,
  isSameDay,
  isSameMonth,
  isToday,
  isWithinInterval,
  startOfMonth,
  subDays,
  subMonths,
} from "date-fns";
import { useState } from "react";
import { LeftArrow, RightArrow } from "../icon/ArrowIcons";

export const DAY_IN_WEEK = 7;

/**
 *
 * @param {Date} firstDateInMonth
 * @returns {{[week: string]: Date[]}}
 */
export const getDatesInCalendar = (firstDateInMonth) => {
  const numOfWeeksInMonth = getWeeksInMonth(firstDateInMonth, {
    weekStartsOn: 6,
  });

  let datesInEachWeek = {};
  let currentDate = subDays(firstDateInMonth, getDay(firstDateInMonth));

  for (let i = 0; i < numOfWeeksInMonth; i++) {
    datesInEachWeek[i] = [];

    while (datesInEachWeek[i].length < DAY_IN_WEEK) {
      datesInEachWeek[i].push(currentDate);
      currentDate = addDays(currentDate, 1);
    }
  }

  return datesInEachWeek;
};

export const DatePicker = () => {
  const [firstDateInMonth, setFirstDateInMonth] = useState(
    startOfMonth(new Date())
  );
  const [activeDateRange, setActiveDayRange] = useState({
    start: null,
    end: null,
  });

  /**
   *
   * @param {boolean} toPrevMonth
   */
  const handleChangeMonth = (toPrevMonth) => {
    if (toPrevMonth) setFirstDateInMonth((prev) => subMonths(prev, 1));
    else setFirstDateInMonth((prev) => addMonths(prev, 1));
  };

  /**
   *
   * @param {Date} date
   */
  const handleSelectActiveDate = (date) => {
    setActiveDayRange((prev) => {
      const { start, end } = prev;

      const isAfterStartDate = compareAsc(start, date) === -1;
      if (start && isAfterStartDate && !end) return { start: start, end: date };
      return { start: date, end: null };
    });
  };

  const renderHeader = () => {
    const year = getYear(firstDateInMonth);
    const month = getMonth(firstDateInMonth);

    return (
      <header className="header">
        <button onClick={() => handleChangeMonth(true)}>
          <LeftArrow />
        </button>
        {year}年{month + 1}月
        <button onClick={() => handleChangeMonth(false)}>
          <RightArrow />
        </button>
      </header>
    );
  };

  const renderDates = () => {
    const datesInEachWeek = getDatesInCalendar(firstDateInMonth);

    return (
      <>
        {Object.entries(datesInEachWeek).map(([, value], i) => (
          <span key={i}>
            {value.map((v, i) => {
              const date = getDate(v);
              const istoday = isToday(v);
              const isNotCurrentMonth = !isSameMonth(v, firstDateInMonth);

              const { start, end } = activeDateRange;
              const isActive =
                end && start
                  ? isWithinInterval(v, { start: start, end: end })
                  : isSameDay(v, start);

              return (
                <button
                  key={i}
                  className={`day-button ${istoday ? "today" : ""} ${
                    isNotCurrentMonth ? "non-current-month" : ""
                  } ${isActive ? "active" : ""}`}
                  onClick={(e) => handleSelectActiveDate(v)}
                >
                  {date}
                </button>
              );
            })}
          </span>
        ))}
      </>
    );
  };

  return (
    <div className="container">
      {renderHeader()}
      {renderDates()}
    </div>
  );
};
