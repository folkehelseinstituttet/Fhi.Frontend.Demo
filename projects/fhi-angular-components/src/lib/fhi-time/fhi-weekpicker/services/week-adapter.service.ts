import { Injectable } from "@angular/core";
import { NgbDateAdapter, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

import { FhiTimeUtilities } from "../../fhi-time-utilities";
import { YearWeek } from "../year-week.model";

/**
 * This Service handles how the date is represented in scripts i.e. ngModel.
 */
@Injectable()
export class WeekAdapterService extends NgbDateAdapter<YearWeek> {
  fromModel(value: YearWeek | string | null): NgbDateStruct | null {
    if (value) {
      if (typeof value === "string") {
        return null;
      } else {
        var date = FhiTimeUtilities.calculateDate(value.week, value.year);
      }
      return date;
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): YearWeek | null {
    if (date) {
      const yearWeek = FhiTimeUtilities.getYearWeekValue(
        new Date(Date.UTC(date.year, date.month - 1, date.day))
      );
      return yearWeek;
    }
    return null;
  }
}
