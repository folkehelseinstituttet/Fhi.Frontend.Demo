import { Injectable } from '@angular/core';
import { LOCALE_ID, Inject } from '@angular/core';
import { NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { i18nValues } from './shared/i18n/i18n-values';

@Injectable()
export class FhiDatepickerI18nService extends NgbDatepickerI18n {
  private i18n: { [key: string]: unknown };

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
    return this.i18n.monthShortNames[month - 1] as string;
  }
  getMonthFullName(month: number): string {
    return this.getMonthShortName(month);
  }
  getDayAriaLabel(date: NgbDateStruct): string {
    const delimiter = this.i18n.dateDelimiter;
    if (this.locale === this.i18n.currentLocal) {
      return `${date.day}${delimiter}${date.month}${delimiter}${date.year}${delimiter}`;
    }
  }
}
