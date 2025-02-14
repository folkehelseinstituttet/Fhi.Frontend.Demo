import { Injectable } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { getISOWeek, getWeek, lastDayOfYear } from 'date-fns';

import { FhiWeek } from '../../shared/models/fhi-week.model';
import { LocaleValues } from '../../shared/i18n/locale-values.model';
import { I18nService } from '../../shared/i18n/i18n.service';

import { TimeConstants } from '../../shared/time.constants';

@Injectable()
export class WeekUtilityService {
  private i18n: LocaleValues;
  private defaultMinDate: NgbDateStruct;
  private defaultMaxDate: NgbDateStruct;
  private minDate: NgbDateStruct;
  private maxDate: NgbDateStruct;

  constructor(private i18nService: I18nService) {
    this.i18n = this.i18nService.getI18nValues();
  }

  getDefaultMinDate(): NgbDateStruct {
    if (this.defaultMinDate) {
      return this.defaultMinDate;
    }
    const date = TimeConstants.minDate;
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    };
  }

  getDefaultMaxDate(): NgbDateStruct {
    if (this.defaultMaxDate) {
      return this.defaultMaxDate;
    }
    const date = TimeConstants.maxDate;

    // TODO: Is this necessary at all?
    //       If yes; it's related to the cryptic line in getWeekDiffInMilliseconds()
    // const dayOfWeek = date.getDay();
    // const weekDayOffset = dayOfWeek > 0 ? 7 - dayOfWeek : 0;
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      // day: date.getDate() + weekDayOffset,
    };
  }

  getMinDate(): NgbDateStruct {
    if (this.minDate) {
      return this.minDate;
    }
    return this.defaultMinDate;
  }

  setMinDate(date: NgbDateStruct) {
    this.minDate = date;
  }

  getMaxDate(): NgbDateStruct {
    if (this.maxDate) {
      return this.maxDate;
    }
    return this.defaultMaxDate;
  }

  setMaxDate(date: NgbDateStruct) {
    this.maxDate = date;
  }

  getWeekFromValidWeekString(value: string): FhiWeek {
    const week = value.split(this.i18n.weekDelimiter);
    return {
      year: parseInt(week[0], 10),
      week: parseInt(week[1], 10),
    };
  }

  getWeekFromDate(date: Date): FhiWeek {
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
      return `${week.year}${this.i18n.weekDelimiter}${week.week}`;
    }
    return '';
  }

  getWeekStringFromDate(date: NgbDateStruct): string {
    if (date === null) {
      return '';
    }
    const jsDate = new Date(date.year, date.month - 1, date.day);
    const yearWeek = this.getWeekFromDate(jsDate);
    return `${yearWeek.year}${this.i18n.weekDelimiter}${yearWeek.week}`;
  }

  getDateFromWeek(week: FhiWeek | undefined): NgbDateStruct | null {
    if (week === undefined) {
      return null;
    }
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

    // TODO: Try to make this line less cryptic ;)
    const weekDiff = weeksInYear - missingDaysInLastWeekOfYear / 7 + 3 / 7 - week;

    return weekDiff * millisecondsPrWeek;
  }
}
