import { Injectable } from '@angular/core';
import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { getISOWeek, getWeek, lastDayOfYear } from 'date-fns';

import { FhiTimeConstants } from '../../fhi-time-constants';
import { FhiWeek } from '../../fhi-week.model';

@Injectable()
export class WeekUtilityService {
  // TODO: dynamically, and globally, set min/max date
  // WeekUtilityService extends TimeUtilityService
  private minWeek = { year: 1900, week: 1 };
  private maxWeek = { year: 2023, week: 48 };

  private minDate = this.getInitMinDate();
  private maxDate = this.getInitMaxDate();

  private lastDayCurrentYear!: Date;
  private lastWeekCurrentYear!: number;

  getMinWeek(): FhiWeek {
    return this.minWeek;
  }
  // setMinWeek():  {
  //   this.minWeek = ...
  // }

  getMaxWeek(): FhiWeek {
    return this.maxWeek;
  }
  // setMaxWeek():  {
  //   this.maxWeek = ...
  // }

  getMinDate(): NgbDateStruct {
    return this.minDate;
  }
  setMinDate(date: NgbDateStruct) {
    this.minDate = date ? date : this.getInitMinDate();
  }

  getMaxDate(): NgbDateStruct {
    return this.maxDate;
  }
  setMaxDate(date: NgbDateStruct) {
    this.maxDate = date ? date : this.getInitMaxDate();
  }

  getInitMaxDate(): NgbDateStruct {
    const date = new Date();
    const dayOfWeek = date.getDay();
    const weekDayOffset = dayOfWeek > 0 ? 7 - dayOfWeek : 0;
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate() + weekDayOffset,
    };
  }

  getInitMinDate(): NgbDateStruct {
    const date = new Date(1900, 0);
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    };
  }

  getLastWeekCurrentYear(year: number): number {
    this.lastDayCurrentYear = lastDayOfYear(new Date(year, 0));
    this.lastWeekCurrentYear = getISOWeek(this.lastDayCurrentYear);
    return this.lastWeekCurrentYear;
  }

  getWeekFromValidWeekString(value: string): FhiWeek {
    const week = value.split(FhiTimeConstants.weekpickerDelimiter);
    return {
      year: parseInt(week[0], 10),
      week: parseInt(week[1], 10),
    };
  }

  getWeekFromNgbDate(date: NgbDate): FhiWeek {
    return this.getFhiWeek(new Date(date.year, date.month - 1, date.day));
  }

  getFhiWeek(date: Date): FhiWeek {
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

  geWeekStringFromWeek(week: FhiWeek): string {
    if (week && week.year && week.week) {
      return `${week.year}${FhiTimeConstants.weekpickerDelimiter}${week.week}`;
    }
    return '';
  }

  getYearWeekStringFromDate(date: NgbDateStruct): string {
    if (date === null) {
      return '';
    }
    const jsDate = new Date(date.year, date.month - 1, date.day);
    const yearWeek = this.getFhiWeek(jsDate);
    return `${yearWeek.year}${FhiTimeConstants.weekpickerDelimiter}${yearWeek.week}`;
  }

  getDateFromWeek(week: FhiWeek): NgbDateStruct | null {
    const lastDayCurrentYear = lastDayOfYear(new Date(week.year, 0));
    const lastWeekCurrentYear = getISOWeek(lastDayCurrentYear);
    return this.getDate(week, lastWeekCurrentYear, lastDayCurrentYear);
  }

  private getDate(
    yearWeek: FhiWeek,
    lastWeekCurrentYear: number,
    lastDayCurrentYear: Date,
  ): NgbDateStruct {
    const weekDiffInMilliseconds = this.getWeekDiffInMilliseconds(
      yearWeek.week,
      lastDayCurrentYear.getDay(),
      lastWeekCurrentYear,
    );
    const date = new Date(lastDayCurrentYear.getTime() - weekDiffInMilliseconds);
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    };
  }

  private getWeekDiffInMilliseconds(
    week: number,
    lastDayOfYear: number,
    lastWeekCurrentYear: number,
  ) {
    const weeksInYear = lastWeekCurrentYear === 52 ? 52 : 53;
    const missingDaysInLastWeekOfYear = lastDayOfYear === 0 ? 0 : 7 - lastDayOfYear;
    const millisecondsPrWeek = 7 * 24 * 60 * 60 * 1000;
    const weekDiff = weeksInYear - missingDaysInLastWeekOfYear / 7 + 3 / 7 - week;
    return weekDiff * millisecondsPrWeek;
  }
}
