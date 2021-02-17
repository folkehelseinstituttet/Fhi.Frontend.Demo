import { Injectable } from '@angular/core';
import { LOCALE_ID, Inject } from '@angular/core';
import { NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

const I18N_VALUES = {
  nb: {
    weekdays: ['Ma', 'Ti', 'On', 'To', 'Fr', 'Lø', 'Sø'],
    months: [
      'Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni',
      'Juli', 'August', 'September', 'Oktober', 'November', 'Desember'
    ]
  }
};

@Injectable({
  providedIn: 'root'
})
export class DatepickerI18nService extends NgbDatepickerI18n {

  constructor(
    @Inject(LOCALE_ID)
    private locale: string
  ) {
    super();
  }

  getWeekdayShortName(weekday: number): string {
    return I18N_VALUES[this.locale].weekdays[weekday - 1];
  }
  getMonthShortName(month: number): string {
    return I18N_VALUES[this.locale].months[month - 1];
  }
  getMonthFullName(month: number): string {
    return this.getMonthShortName(month);
  }
  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.day.toString().padStart(2, '0')}.${date.month.toString().padStart(2, '0')}.${date.year}`;
  }
}
