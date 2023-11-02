import { Injectable } from '@angular/core';
import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { getISOWeek, getWeek, lastDayOfYear } from 'date-fns';

import { YearWeek } from '../year-week.model';

// import { WeekErrorState, WeekValidatorService } from './week-validator.service';

import { toNumber } from 'lodash-es';
import { WeekSharedDataService } from './week-shared-data.service';

@Injectable()
export class WeekUtilityService {
  private maxDate = this.getInitMaxDate();
  private minDate = this.getInitMinDate();
  private isMinWeekOrMaxWeek = false;

  constructor(
    // private weekValidatorService: WeekValidatorService,
    private weekSharedDataService: WeekSharedDataService,
  ) { }

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
      year: date.getFullYear() + 1,
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
    return `${yearWeek.year}${this.weekSharedDataService.weekpickerDelimiter}${yearWeek.week}`;
  }

  getDateFromValidYearWeekString(yearWeekString: string): NgbDateStruct | null {

    // TODO: add a guard for yearWeekString not valid!

    if (yearWeekString === null) {
      return null;
    }
    const parts = yearWeekString.split(this.weekSharedDataService.weekpickerDelimiter);
    const year = parseInt(parts[0], 10);
    const week = parseInt(parts[1], 10);
    return this.getDateFromYearWeek__NEW({ week, year });
  }

  getDateFromYearWeek__NEW(yearWeek: YearWeek): NgbDateStruct | null {
    const lastDayCurrentYear = lastDayOfYear(new Date(yearWeek.year, 0));
    const lastWeekCurrentYear = getISOWeek(lastDayCurrentYear);
    return this.getDate(lastWeekCurrentYear, yearWeek, lastDayCurrentYear);
  }






  // TODO: deprecated
  
  getDateFromYearWeekString(yearWeekString: string | null): NgbDateStruct | null {

    // console.log('getDateFromYearWeekString(yearWeekString)', yearWeekString);

    // if (yearWeekString === null && this.weekValidatorService.weekIsRequired) {
    //   this.weekValidatorService.updateErrorMsg(WeekErrorState.weekIsRequired);
    //   return null;
    // }

    if (yearWeekString === null) {
      return null;
    }

    if (yearWeekString === '') {
      console.log('getDateFromYearWeekString(yearWeekString) -> empty string');
    }


    // TODO: error if validating twice for empty value...


    if (yearWeekString.length < 6) {
      // this.weekValidatorService.updateErrorMsg(WeekErrorState.toFewCharacters);
      return null;
    }

    const parts = yearWeekString.split(this.weekSharedDataService.weekpickerDelimiter);

    if (parts.length < 2 || parts.length > 2) {
      // this.weekValidatorService.updateErrorMsg(WeekErrorState.notOneDelimiter);
      return null;
    }

    if (isNaN(toNumber(parts[0])) || isNaN(toNumber(parts[1]))) {
      // this.weekValidatorService.updateErrorMsg(WeekErrorState.onlyNumbersAllowed);
      return null;
    }

    const year = parseInt(parts[0], 10);
    const week = parseInt(parts[1], 10);

    return this.getDateFromYearWeek({ week, year });
  }
  // TODO: deprecated
  getDateFromYearWeek(yearWeek: YearWeek): NgbDateStruct | null {
    if (yearWeek.week < 1 || yearWeek.week > 53) {
      // this.weekValidatorService.updateErrorMsg(WeekErrorState.notValidWeekNumber);
      return null;
    }

    const lastDayCurrentYear = lastDayOfYear(new Date(yearWeek.year, 0));
    const lastWeekCurrentYear = getISOWeek(lastDayCurrentYear);

    if (yearWeek.week === 53 && lastWeekCurrentYear !== 53) {
      // this.weekValidatorService.updateErrorMsg(WeekErrorState.not53WeeksInThisYear);
      return null;
    }

    const date = this.getDate(lastWeekCurrentYear, yearWeek, lastDayCurrentYear);

    if (
      !this.isMinWeekOrMaxWeek &&
      (NgbDate.from(date).before(this.minDate) || NgbDate.from(date).after(this.maxDate))
    ) {
      // this.weekValidatorService.updateErrorMsg(WeekErrorState.weekOutsideMaxOrMin);
      return null;
    }
    return date;
  }
  // TODO: this one should be handled in better way if possibel
  getMinDateOrMaxDateFromYearWeekString(yearWeekString: string | null): NgbDateStruct | null {
    this.isMinWeekOrMaxWeek = true;
    const date = this.getDateFromYearWeekString(yearWeekString);
    this.isMinWeekOrMaxWeek = false;
    return date;
  }









  private getDate(lastWeekCurrentYear: number, yearWeek: YearWeek, lastDayCurrentYear: Date): NgbDateStruct {
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
