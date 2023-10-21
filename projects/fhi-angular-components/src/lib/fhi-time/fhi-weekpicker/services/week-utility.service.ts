import { Injectable } from '@angular/core';
import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { getISOWeek, getWeek, getYear, lastDayOfYear } from 'date-fns';

import { YearWeek } from '../year-week.model';
import { WeekErrorStates, WeekValidatorService } from './week-validator.service';
import { toNumber } from 'lodash-es';

@Injectable()
export class WeekUtilityService {
  private readonly weekpickerDelimiter = '-';
  private maxDate = this.getInitMaxDate();
  private minDate = this.getInitMinDate();

  constructor(private weekValidatorService: WeekValidatorService) { }

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
    const today = new Date();
    return {
      year: today.getUTCFullYear(),
      month: today.getMonth() + 1,
      day: today.getDate()
    };
  }

  getInitMinDate(): NgbDateStruct {
    const minDate = new Date(1900, 0);
    return {
      year: minDate.getUTCFullYear() + 1,
      month: minDate.getMonth() + 1,
      day: minDate.getDate()
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

  getDateFromYearWeek(yearWeek?: YearWeek): NgbDateStruct | null {
    if (yearWeek.week < 1 || yearWeek.week > 53) {
      this.weekValidatorService.setErrorMsg(WeekErrorStates.notValidWeekNumber);
      return null;
    }

    const lastDayCurrentYear = lastDayOfYear(new Date(yearWeek.year, 0));
    const lastWeekCurrentYear = getISOWeek(lastDayCurrentYear);

    if (yearWeek.week === 53 && lastWeekCurrentYear !== 53) {
      this.weekValidatorService.setErrorMsg(WeekErrorStates.not53WeeksInThisYear);
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
      this.weekValidatorService.setErrorMsg(WeekErrorStates.notValidWeek);
      return null;
    }
    if (NgbDate.from(date).before(this.minDate) || NgbDate.from(date).after(this.maxDate)) {
      this.weekValidatorService.setErrorMsg(WeekErrorStates.weekOutsideMaxAndMinWeek);
      return null;
    }
    return date;
  }

  getDateFromYearWeekString(yearWeekString: string): NgbDateStruct | null {
    if (!yearWeekString) {
      this.weekValidatorService.setErrorMsg(WeekErrorStates.toFewCharacters);
      return null;
    }

    const parts = yearWeekString.split(this.weekpickerDelimiter);

    if (parts.length < 2 || parts.length > 2) {
      // TODO: better test for parts
      // console.log('3. yearWeekString', yearWeekString);
      // console.log('parts', parts);
      this.weekValidatorService.setErrorMsg(WeekErrorStates.toFewCharacters);
      return null;
    }
    if (isNaN(toNumber(parts[0])) || isNaN(toNumber(parts[1]))) {
      this.weekValidatorService.setErrorMsg(WeekErrorStates.onlyNumbersAllowed);
      return null;
    }
    const year = parseInt(parts[0], 10);
    const week = parseInt(parts[1], 10);
    return this.getDateFromYearWeek({ week, year });
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
