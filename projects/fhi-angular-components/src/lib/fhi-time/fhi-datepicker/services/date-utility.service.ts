import { Injectable } from '@angular/core';
import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FhiDate } from '../../fhi-date.model';

@Injectable()
export class DateUtilityService {
  getNgbDateStruct(value: string): NgbDateStruct {
    return this.getDateObject(value);
  }

  getFhiDate(value: string): FhiDate {
    return this.getDateObject(value);
  }

  getLocalDateString(date: NgbDateStruct | FhiDate): string {
    return new Date(date.year, date.month - 1, date.day).toLocaleDateString('no-nb', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  }

  convertNgbDateToFhiDate(date: NgbDate): FhiDate {
    return {
      year: date.year,
      month: date.month,
      day: date.day,
    };
  }

  private getDateObject(value: string): FhiDate | NgbDateStruct {
    const date = value.split('.'); // TODO: constants
    return {
      day: parseInt(date[0], 10),
      month: parseInt(date[1], 10),
      year: parseInt(date[2], 10),
    };
  }
}
