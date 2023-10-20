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
      } else {
        var date = this.weekUtilityService.calculateDate(value.week, value.year);
      }
      return date;
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): YearWeek | null {
    if (date) {
      const yearWeek = this.weekUtilityService.getYearWeek(
        new Date(Date.UTC(date.year, date.month - 1, date.day))
      );
      return yearWeek;
    }
    return null;
  }
}
