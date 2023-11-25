import { Injectable } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { FhiDate } from '../../fhi-date.model';
import { format } from 'date-fns';

@Injectable()
export class DateUtilityService {
  // TODO: dynamically, and globally, set min/max date
  // DateUtilityService extends TimeUtilityService
  private minDate: FhiDate = this.getFhiDateFromValidDateString('01.01.1900');
  private maxDate: FhiDate = this.getFhiDateFromValidDateString('25.11.2023');

  getMinDate(): FhiDate {
    return this.minDate;
  }

  setMinDate(minDate: FhiDate) {
    this.minDate = minDate;
  }

  getMaxDate(): FhiDate {
    return this.maxDate;
  }

  setMaxDate(maxDate: FhiDate) {
    this.maxDate = maxDate;
  }

  getLocalDateString(date: FhiDate): string {
    const localFormat = 'dd.MM.yyyy';
    return format(new Date(date.year, date.month - 1, date.day), localFormat);
  }

  getFhiDateFromValidDateString(value: string): FhiDate {
    const date = value.split('.'); // TODO: constants
    return {
      day: parseInt(date[0], 10),
      month: parseInt(date[1], 10),
      year: parseInt(date[2], 10),
    };
  }

  getFhiDateFromNgbDate(date: NgbDate): FhiDate {
    return {
      year: date.year,
      month: date.month,
      day: date.day,
    };
  }

  getNgbDateFromFhiDate(date: FhiDate) {
    return new NgbDate(date.year, date.month, date.day);
  }
}
