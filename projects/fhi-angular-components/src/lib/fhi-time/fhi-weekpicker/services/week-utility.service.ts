import { Injectable } from '@angular/core';
import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { getWeek, getYear, min } from 'date-fns';

import { YearWeek } from '../year-week.model';

@Injectable()
export class WeekUtilityService {
  private readonly weekpickerDelimiter = '-';
  private maxYear = getYear(new Date());
  private minYear = 1900;

  updateMaxYear(maxDate: NgbDateStruct) {
    this.maxYear = maxDate.year;
  }

  updateMinYear(minDate: NgbDateStruct) {
    this.minYear = minDate.year;
  }
  
  calculateDate(week: number, year: number): NgbDateStruct | null {
    if (week < 1 || week > 53 || year < this.minYear || year > this.maxYear) {
      return null;
    }
    const firstDay = new Date(year + '-1-4');
    const date = new Date(
      firstDay.getTime() + (week - 1) * 7 * 24 * 60 * 60 * 1000
    );
    const fullYear = date.getUTCFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return {
      year: fullYear ? fullYear : null,
      month: month ? month : null,
      day: day ? day : null
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

    if (!date || date.day === null || date.month === null || date.year === null) {
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
