import { Injectable } from '@angular/core';
import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { format } from 'date-fns';

import { FhiDate } from '../../shared/models/fhi-date.model';
import { TimeConstants } from '../../shared/time.constants';

@Injectable()
export class DateUtilityService {
  private defaultMinDate: NgbDateStruct;
  private defaultMaxDate: NgbDateStruct;
  private minDate: NgbDateStruct;
  private maxDate: NgbDateStruct;

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
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
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

  getLocalDateString(date: FhiDate): string {
    const localFormat = 'dd.MM.yyyy'; // TODO: constants
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
