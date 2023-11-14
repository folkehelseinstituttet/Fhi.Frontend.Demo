import { Injectable } from '@angular/core';
import { NgbDateAdapter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { FhiWeek } from '../fhi-week.model';
import { WeekUtilityService } from './week-utility.service';

/**
 * This Service handles how the date is represented in scripts i.e. ngModel.
 */
@Injectable()
export class WeekAdapterService extends NgbDateAdapter<FhiWeek> {
  constructor(private weekUtilityService: WeekUtilityService) {
    super();
  }

  fromModel(value: FhiWeek | string | null): NgbDateStruct | null {
    if (value) {
      if (typeof value === 'string') {
        return null;
      }
      return this.weekUtilityService.getDateFromYearWeek(value);
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): FhiWeek | null {
    if (date) {
      return this.weekUtilityService.getYearWeek(new Date(date.year, date.month - 1, date.day));
    }
    return null;
  }
}
