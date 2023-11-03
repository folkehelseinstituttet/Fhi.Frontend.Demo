import { Injectable } from '@angular/core';
import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { getISOWeek, getWeek, lastDayOfYear } from 'date-fns';

import { FhiTimeConstants } from "../../fhi-time-constants";
import { YearWeek } from '../year-week.model';

@Injectable()
export class WeekUtilityService {
  private maxDate = this.getInitMaxDate();
  private minDate = this.getInitMinDate();
  private lastDayCurrentYear!: Date;
  private lastWeekCurrentYear!: number;
  private validYearWeek!: YearWeek;
  private validYearWeekString!: string;

  getLastWeekCurrentYear(year: number): number {
    this.lastDayCurrentYear = lastDayOfYear(new Date(year, 0));
    this.lastWeekCurrentYear = getISOWeek(this.lastDayCurrentYear);
    return this.lastWeekCurrentYear;
  }

  setValidYearWeek(yearWeek: YearWeek) {
    this.validYearWeek = yearWeek;
  }

  setValidYearWeekString(value: string) {
    this.validYearWeekString = value;
  }

  getMaxDate(): NgbDateStruct {
    return this.maxDate;
  }

  getMinDate(): NgbDateStruct {
    return this.minDate;
  }

  setMaxDate(date: NgbDateStruct) {
    this.maxDate = (date) ? date : this.getInitMaxDate();
  }

  setMinDate(date: NgbDateStruct) {
    this.minDate = (date) ? date : this.getInitMinDate();
  }

  getInitMaxDate(): NgbDateStruct {
    const date = new Date();
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate()
    };
  }

  getInitMinDate(): NgbDateStruct {
    const date = new Date(1900, 0);
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate()
    };
  }

  isOutsideMaxOrMin(date: NgbDateStruct | null): boolean {
    return (
      NgbDate.from(date).before(this.minDate) || 
      NgbDate.from(date).after(this.maxDate)
    );
  }

  getYearWeek(date: Date): YearWeek {
    let year = date.getFullYear();
    const week = getWeek(date, {
      weekStartsOn: 1,
      firstWeekContainsDate: 4,
    });
    if (week === 1 && date.getMonth() === 11) {
      year = year + 1;
    }
    if (week === 53 && date.getMonth() === 0) {
      year = year - 1;
    }
    return { year: year, week: week };
  }

  getYearWeekStringFromDate(date: NgbDateStruct): string {
    if (date === null) {
      return '';
    }
    const jsDate = new Date(date.year, date.month - 1, date.day);
    const yearWeek = this.getYearWeek(jsDate);
    return `${yearWeek.year}${FhiTimeConstants.weekpickerDelimiter}${yearWeek.week}`;
  }

  getDateAfterValidatinYearWeekString(): NgbDateStruct | null {
    if (this.validYearWeekString === undefined) {
      throw new Error(`WeekUtilityService.getDateAfterValidatinYearWeekString() is called before yearWeekString is validated.`);
    }
    if (this.validYearWeekString === '') {
      return null;
    }
    const date = this.getDate(this.validYearWeek, this.lastWeekCurrentYear, this.lastDayCurrentYear);
    this.validYearWeekString = undefined;
    return date;
  }

  getDateFromYearWeek(yearWeek: YearWeek): NgbDateStruct | null {
    const lastDayCurrentYear = lastDayOfYear(new Date(yearWeek.year, 0));
    const lastWeekCurrentYear = getISOWeek(lastDayCurrentYear);
    return this.getDate(yearWeek, lastWeekCurrentYear, lastDayCurrentYear);
  }

  private getDate(yearWeek: YearWeek, lastWeekCurrentYear: number, lastDayCurrentYear: Date): NgbDateStruct {
    const weekDiffInMilliseconds = this.getWeekDiffInMilliseconds(
      yearWeek.week, lastDayCurrentYear.getDay(), lastWeekCurrentYear
    );
    const date = new Date(lastDayCurrentYear.getTime() - weekDiffInMilliseconds);
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate()
    };
  }

  private getWeekDiffInMilliseconds(week: number, lastDayOfYear: number, lastWeekCurrentYear: number) {
    const weeksInYear = (lastWeekCurrentYear === 52) ? 52 : 53;
    const missingDaysInLastWeekOfYear = (lastDayOfYear === 0) ? 0 : 7 - lastDayOfYear;
    const millisecondsPrWeek = 7 * 24 * 60 * 60 * 1000;
    const weekDiff = weeksInYear - (missingDaysInLastWeekOfYear / 7) + (3 / 7) - week;
    return weekDiff * millisecondsPrWeek;
  }
}
