import { Injectable } from '@angular/core';
import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { format } from 'date-fns';

import { TimeConstants } from '../../shared/time.constants';
import { FhiDate } from '../../shared/models/fhi-date.model';
import { I18nService } from '../../shared/i18n/i18n.service';
import { LocalValues } from '../../shared/i18n/local-values.model';

@Injectable()
export class DateUtilityService {
  private i18n: LocalValues;
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
    return this.i18nService.getLocalDateString(new Date(date.year, date.month - 1, date.day));
  }

  getFhiDateFromValidDateString(value: string): FhiDate {
    const date = value.split(this.i18n.dateDelimiter);
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
