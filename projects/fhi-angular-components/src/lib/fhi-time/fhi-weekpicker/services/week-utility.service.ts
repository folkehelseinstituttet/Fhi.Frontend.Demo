import { Injectable } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { getISOWeek, getWeek, getYear, lastDayOfYear } from 'date-fns';

import { YearWeek } from '../year-week.model';
import { WeekErrorStates, WeekValidatorService } from './week-validator.service';
import { toNumber } from 'lodash-es';

@Injectable()
export class WeekUtilityService {
  private readonly weekpickerDelimiter = '-';
  private maxYear = getYear(new Date());
  private minYear = 1900;

  constructor(private weekValidatorService: WeekValidatorService) { }

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
      this.weekValidatorService.setErrorMsg(WeekErrorStates.notValidWeek);
      return null;
    }


    // TODO: better error msg's...
    // if (yearWeek < this.minWeek || yearWeek > this.maxWeek) {
    //   // Include this.minWeek - this.maxWeek in error msg.
    //   this.weekValidatorService.setErrorMsg(WeekErrorStates.weekOutsideMaxAndMinWeek);
    //   return null;
    // }
    // ...and check for 2020-51 when [maxWeek]="'2020-50'" (and other combinations)
    if (yearWeek.year < this.minYear || yearWeek.year > this.maxYear) {
      this.weekValidatorService.setErrorMsg(WeekErrorStates.weekOutsideMaxAndMinWeek);
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
    return date;
  }

  getDateFromYearWeekString(yearWeekString: string): NgbDateStruct | null {
    if (!yearWeekString) {
      this.weekValidatorService.setErrorMsg(WeekErrorStates.toFewCharacters);
      return null;
    }
    const parts = yearWeekString.split(this.weekpickerDelimiter);

    if (parts.length < 2 || parts.length > 2) {
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
