import { Injectable } from '@angular/core';
import { LOCALE_ID, Inject } from '@angular/core';
import { NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { i18nValues } from './i18n-values';
import { FhiI18n } from '../models/fhi-i18n.model';

@Injectable()
export class DatepickerI18nService extends NgbDatepickerI18n {
  private i18n: FhiI18n;

  constructor(
    @Inject(LOCALE_ID)
    private locale: string,
  ) {
    super();
    this.i18n = i18nValues[this.locale];
  }

  getWeekdayLabel(weekday: number): string {
    return this.i18n.weekdays[weekday - 1];
  }
  getWeekLabel(): string {
    return this.i18n.weekLabel as string;
  }
  getMonthShortName(month: number): string {
    return this.i18n.monthShortNames[month - 1];
  }
  getMonthFullName(month: number): string {
    return this.getMonthShortName(month);
  }
  getDayAriaLabel(date: NgbDateStruct): string {
    const delimiter = this.i18n.dateDelimiter;
    // console.log('this.i18n.currentLocal', this.i18n.currentLocal);
    if (this.locale === this.i18n.currentLocal) {
      // TODO: service?
      return `${date.day}${delimiter}${date.month}${delimiter}${date.year}${delimiter}`;
    }
  }
}
