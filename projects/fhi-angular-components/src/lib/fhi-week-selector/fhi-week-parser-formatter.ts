import { Injectable } from "@angular/core";
import { NgbDateParserFormatter, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { FhiWeekSelectorComponent } from "./fhi-week-selector.component";

@Injectable()
export class FhiWeekParserFormatter extends NgbDateParserFormatter {
  private readonly DELIMITER: string = '-';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      const parts = value.split(this.DELIMITER);
      const year = parseInt(parts[0], 10);
      const week = parseInt(parts[1], 10);
      
      let date = FhiWeekSelectorComponent.calculateDate(week, year);

      if (date===null) {
        return {year: -1, month: -1, day: -1}
      }
      return date;
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    if (date === null) return '';
    const jsDate = new Date(date.year, date.month-1, date.day);
    const yearWeekValue = FhiWeekSelectorComponent.getYearWeekValue(jsDate);
    return `${yearWeekValue.year}${this.DELIMITER}${yearWeekValue.week}`;
  }
}
