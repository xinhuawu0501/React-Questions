import { DAY_IN_WEEK, getDatesInCalendar } from "./DatePicker";
import { getWeeksInMonth } from "date-fns";

const testDatesInCalendar = (receiveDate, expectDate, [week, day]) => {
  const dates = getDatesInCalendar(receiveDate);
  expect(dates[week][day]).toMatchObject(expectDate);
};

describe("dates are grouped correctly", () => {
  it("first day in calendar is 10/29 if receive 2023/11/01", () => {
    testDatesInCalendar(new Date(2023, 10), new Date(2023, 9, 29), [0, 0]);
  });

  it("first day in calendar is 11/26 if receive 2023/12/01", () => {
    testDatesInCalendar(new Date(2023, 11, 1), new Date(2023, 10, 26), [0, 0]);
  });

  it("first day in calendar is 12/31 if receive 2024/01/01", () => {
    testDatesInCalendar(new Date(2024, 0, 1), new Date(2023, 11, 31), [0, 0]);
  });

  it("last day in calendar is 12/02 if receive 2023/11/01", () => {
    const testDate = new Date(2023, 10, 1);
    const numOfWeeks = getWeeksInMonth(testDate);
    testDatesInCalendar(testDate, new Date(2023, 11, 2), [
      numOfWeeks - 1,
      DAY_IN_WEEK - 1,
    ]);
  });

  it("last day in calendar is 01/06 if receive 2023/12/01", () => {
    const testDate = new Date(2023, 11, 1);
    const numOfWeeks = getWeeksInMonth(testDate);
    testDatesInCalendar(testDate, new Date(2024, 0, 6), [
      numOfWeeks - 1,
      DAY_IN_WEEK - 1,
    ]);
  });
});
