import { Injectable } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { getISOWeek, getWeek, getYear, lastDayOfYear } from 'date-fns';

import { YearWeek } from '../year-week.model';

@Injectable()
export class WeekUtilityService {
  private readonly weekpickerDelimiter = '-';
  private maxYear = getYear(new Date());
  private minYear = 1900;

  updateMaxYear(maxDate: NgbDateStruct) {
    if (maxDate) {
      this.maxYear = maxDate.year;
    }
  }

  updateMinYear(minDate: NgbDateStruct) {
    if (minDate) {
      this.minYear = minDate.year;
    }
  }
  
  getDateFromYearWeek(yearWeek?: YearWeek): NgbDateStruct | null {
    if (yearWeek.week < 1 || yearWeek.week > 53 || yearWeek.year < this.minYear || yearWeek.year > this.maxYear) {
      return null;
    }
    const lastDayCurrentYear = lastDayOfYear(new Date(yearWeek.year, 0));
    const lastWeekCurrentYear = getISOWeek(lastDayCurrentYear);

    if (yearWeek.week === 53 && lastWeekCurrentYear !== 53) {
      return null;
    }
    const millisecondsInOneWeek = 7 * 24 * 60 * 60 * 1000;
    const weekDiffInMilliseconds = (lastWeekCurrentYear - yearWeek.week) * millisecondsInOneWeek;
    const tmpDate = new Date(lastDayCurrentYear.getTime() - weekDiffInMilliseconds);
    const date = {
      year: tmpDate.getUTCFullYear(),
      month: tmpDate.getMonth() + 1,
      day: tmpDate.getDate()
    };
    if (isNaN(date.day) || isNaN(date.month) || isNaN(date.year)) {
      return null;
    }
    return date;
  }

  getYearWeek(date: Date): YearWeek {
    const week = getWeek(
      new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())),
      {
        weekStartsOn: 1,
        firstWeekContainsDate: 4,
      }
    );
    return { year: date.getFullYear(), week: week };
  }

  getDateFromYearWeekString(yearWeekString: string): NgbDateStruct | null {
    if (!yearWeekString) {
      return null;
    }
    const parts = yearWeekString.split(this.weekpickerDelimiter);

    if (parts.length < 2 || parts.length > 2) {
      return null;
    }
    const year = parseInt(parts[0], 10);
    const week = parseInt(parts[1], 10);
    const date = this.getDateFromYearWeek({ week, year });

    return date;
  }

  getYearWeekStringFromDate(date: NgbDateStruct): string {
    if (date === null) {
      return '';
    }
    const jsDate = new Date(date.year, date.month - 1, date.day);
    const yearWeek = this.getYearWeek(jsDate);
    return `${yearWeek.year}${this.weekpickerDelimiter}${yearWeek.week}`;
  }
}
