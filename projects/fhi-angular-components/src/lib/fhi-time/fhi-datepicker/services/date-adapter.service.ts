import { Injectable } from '@angular/core';
import { NgbDateAdapter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DateUtilityService } from './date-utility.service';

/**
 * This Service handles how the date is represented in scripts i.e. ngModel.
 */
@Injectable()
export class DateAdapterService extends NgbDateAdapter<string> {
  constructor(private dateUtilityService: DateUtilityService) {
    super();
  }

  fromModel(value: string | null): NgbDateStruct | null {
    // console.warn('fromModel(value):', value);
    if (value) {
      return this.dateUtilityService.getNgbDateStruct(value);
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    // console.warn('toModel(date):', date);
    if (date) {
      return this.dateUtilityService.getLocalDateString(date);
    }
    return null;
  }
}
