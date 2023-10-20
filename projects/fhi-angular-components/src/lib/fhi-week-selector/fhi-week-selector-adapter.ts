import { Injectable } from "@angular/core";
import { NgbDateAdapter, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { FhiWeekSelectorValue } from "./fhi-week-selector-value.model";
import { FhiWeekSelectorComponent } from "./fhi-week-selector.component";

@Injectable()
export class FhiCustomAdapter extends NgbDateAdapter<FhiWeekSelectorValue> {

  fromModel(value: FhiWeekSelectorValue | string | null): NgbDateStruct | null { 
    if (value) {
      if (typeof value === 'string') {
        return null;
      } else {
        var date =  FhiWeekSelectorComponent.calculateDate(value.week, value.year);
      }
      return date;
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): FhiWeekSelectorValue | null {
    if (date) {
      return FhiWeekSelectorComponent.getYearWeekValue(new Date(Date.UTC(date.year, date.month-1, date.day)));
    } 
    return null;
  }
}
