import { Injectable } from '@angular/core';
import { NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { LocalValues } from './local-values.model';
import { I18nService } from './i18n.service';

@Injectable()
export class DatepickerI18nService extends NgbDatepickerI18n {
  private i18n: LocalValues;

  constructor(private i18nService: I18nService) {
    super();
    this.i18n = this.i18nService.getI18nValues();
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
    return this.i18nService.getLocalDateString(new Date(date.year, date.month - 1, date.day));
  }
}
