import { NgbDate, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { getWeek } from "date-fns";

import { YearWeek } from "./fhi-weekpicker/year-week.model";
import { FhiTimeConstants } from "./fhi-time-constants";

export class FhiTimeUtilities {
  static calculateDate(week: number, year: number): NgbDate | null {
    if (week < 1 || week > 53 || year < 1900) return null;

    const firstDay = new Date(year + "-1-4");
    const date = new Date(
      firstDay.getTime() + (week - 1) * 7 * 24 * 60 * 60 * 1000
    );

    return new NgbDate(
      date.getUTCFullYear(),
      date.getMonth() + 1,
      date.getDate()
    );
  }

  static getYearWeekValue(date: Date): YearWeek {
    const week = getWeek(
      new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())),
      {
        weekStartsOn: 1,
        firstWeekContainsDate: 4,
      }
    );
    return { year: date.getFullYear(), week: week };
  }

  static getDateFromYearWeekString(yearWeek: string): NgbDateStruct | null {
    const parts = yearWeek.split(FhiTimeConstants.delimiter);
    if (parts.length < 2 || parts.length > 2) {
      return null;
    }
    const year = parseInt(parts[0], 10);
    const week = parseInt(parts[1], 10);
    let date = FhiTimeUtilities.calculateDate(week, year);
    return date;
  }

  static getYearWeekStringFromDate(date: NgbDateStruct): string {
    if (date === null) {
      return '';
    }
    const jsDate = new Date(date.year, date.month - 1, date.day);
    const yearWeekValue = FhiTimeUtilities.getYearWeekValue(jsDate);
    return `${yearWeekValue.year}${FhiTimeConstants.delimiter}${yearWeekValue.week}`;
  }

}
