import { Injectable } from '@angular/core';
import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { getISOWeek, getWeek, lastDayOfYear } from 'date-fns';

import { YearWeek } from '../year-week.model';
import { WeekErrorState, WeekValidationContext, WeekValidatorService } from './week-validator.service';
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
    const date = new Date();
    return {
      year: date.getUTCFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate()
    };
  }

  getInitMinDate(): NgbDateStruct {
    const date = new Date(1900, 0);
    return {
      year: date.getUTCFullYear() + 1,
      month: date.getMonth() + 1,
      day: date.getDate()
    };
  }

  getYearWeek(date: Date): YearWeek {
    let year = date.getFullYear();
    const week = getWeek(date, {
      weekStartsOn: 1,
      firstWeekContainsDate: 4,
    });
    if (week === 53 && date.getMonth() === 0 && date.getDate() < 4) {
      year = year - 1;
    }
    return { year: year, week: week };
  }

  getDateFromYearWeek(yearWeek: YearWeek): NgbDateStruct | null {
    if (yearWeek.week < 1 || yearWeek.week > 53) {
      this.weekValidatorService.updateErrorMsgAndState(WeekErrorState.notValidWeekNumber);
      return null;
    }

    const lastDayCurrentYear = lastDayOfYear(new Date(yearWeek.year, 0));
    const lastWeekCurrentYear = getISOWeek(lastDayCurrentYear);

    if (yearWeek.week === 53 && lastWeekCurrentYear !== 53) {
      this.weekValidatorService.updateErrorMsgAndState(WeekErrorState.not53WeeksInThisYear);
      return null;
    }

    const date = this.getDate(lastWeekCurrentYear, yearWeek, lastDayCurrentYear);

    if (this.isOutsideMaxOrMin(date) && this.weekValidationContextIsNotMaxOrMin()) {
      this.weekValidatorService.updateErrorMsgAndState(WeekErrorState.weekOutsideMaxOrMin);
      return null;
    }
    return date;
  }

  getDateFromYearWeekString(yearWeekString: string | null): NgbDateStruct | null {

    console.log('getDateFromYearWeekString(yearWeekString)', yearWeekString);

    if (yearWeekString === null && this.weekValidatorService.weekIsRequired) {
      this.weekValidatorService.updateErrorMsgAndState(WeekErrorState.weekIsRequired);
      return null;
    }

    if (yearWeekString === null) {
      return { year: -1, month: -1, day: -1 };
    }

    if (yearWeekString.length < 6) {
      this.weekValidatorService.updateErrorMsgAndState(WeekErrorState.toFewCharacters);
      return null;
    }

    const parts = yearWeekString.split(this.weekpickerDelimiter);

    if (parts.length < 2 || parts.length > 2) {
      this.weekValidatorService.updateErrorMsgAndState(WeekErrorState.notOneDelimiter);
      return null;
    }

    if (isNaN(toNumber(parts[0])) || isNaN(toNumber(parts[1]))) {
      this.weekValidatorService.updateErrorMsgAndState(WeekErrorState.onlyNumbersAllowed);
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

  private getDate(lastWeekCurrentYear: number, yearWeek: YearWeek, lastDayCurrentYear: Date): NgbDateStruct {

    // console.log('----------------------');
    // console.log('lastWeekCurrentYear', lastWeekCurrentYear);
    // console.log('yearWeek', yearWeek);
    // console.log('lastDayCurrentYear', lastDayCurrentYear);

    const millisecondsInOneWeek = 7 * 24 * 60 * 60 * 1000;
    const weekDiffInMilliseconds = (lastWeekCurrentYear - yearWeek.week) * millisecondsInOneWeek;
    const date = new Date(lastDayCurrentYear.getTime() - weekDiffInMilliseconds);
    return {
      year: date.getUTCFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate()
    };
  }

  private isOutsideMaxOrMin(date: NgbDateStruct) {
    return NgbDate.from(date).before(this.minDate) || NgbDate.from(date).after(this.maxDate);
  }

  private weekValidationContextIsNotMaxOrMin() {
    return this.weekValidatorService.getValidationContext() !== WeekValidationContext.weekpickerMaxWeekChangeActions &&
      this.weekValidatorService.getValidationContext() !== WeekValidationContext.weekpickerMinWeekChangeActions;
  }
}
