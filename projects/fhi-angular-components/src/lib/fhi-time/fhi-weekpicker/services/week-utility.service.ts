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
  
  calculateDate(week: number, year: number): NgbDateStruct | null {
    if (week < 1 || week > 53 || year < this.minYear || year > this.maxYear) {
      return null;
    }
  
    const lastDayCurrentYear = lastDayOfYear(new Date(year, 0));
    const lastWeekCurrentYear = getISOWeek(lastDayCurrentYear);

    // Test for years without 53rd week
    if (week === 53 && lastWeekCurrentYear !== 53) {
      return null;
    }

    const millisecondsInOneWeek = 7 * 24 * 60 * 60 * 1000;
    const millisecondsDiff = (lastWeekCurrentYear - week) * millisecondsInOneWeek;
    const date = new Date(lastDayCurrentYear.getTime() - millisecondsDiff);

    return {
      year: date.getUTCFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate()
    };
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
    const date = this.calculateDate(week, year);

    if (!date || isNaN(date.day) || isNaN(date.month) || isNaN(date.year)) {
      return null;
    }
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
