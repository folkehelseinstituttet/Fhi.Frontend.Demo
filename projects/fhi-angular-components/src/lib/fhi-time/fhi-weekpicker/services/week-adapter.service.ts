import { Injectable } from "@angular/core";
import { NgbDateAdapter, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

import { YearWeek } from "../year-week.model";
import { WeekUtilityService } from "./week-utility.service";

/**
 * This Service handles how the date is represented in scripts i.e. ngModel.
 */
@Injectable()
export class WeekAdapterService extends NgbDateAdapter<YearWeek> {
  constructor(
    private weekUtilityService: WeekUtilityService
  ) {
    super();
  }

  fromModel(value: YearWeek | string | null): NgbDateStruct | null {
    if (value) {
      if (typeof value === "string") {
        return null;
      }
      return this.weekUtilityService.getDateFromYearWeek(value);
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): YearWeek | null {
    if (date) {
      return this.weekUtilityService.getYearWeek(
        new Date(Date.UTC(date.year, date.month - 1, date.day))
      );
    }
    return null;
  }
}
