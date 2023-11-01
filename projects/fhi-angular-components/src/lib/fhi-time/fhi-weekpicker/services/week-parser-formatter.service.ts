import { Injectable } from "@angular/core";
import {
  NgbDateParserFormatter,
  NgbDateStruct,
} from "@ng-bootstrap/ng-bootstrap";

import { WeekErrorState, WeekValidatorService } from "./week-validator.service";
import { WeekUtilityService } from "./week-utility.service";

/**
 * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
 */
@Injectable()
export class WeekParserFormatterService extends NgbDateParserFormatter {
  constructor(
    private weekValidatorService: WeekValidatorService,
    private weekUtilityService: WeekUtilityService
  ) {
    super();
  }

  parse(value: string): NgbDateStruct | null {
    if (value) {
      return this.getDate(value);
    }
    if (!this.weekValidatorService.weekIsRequired) {
      this.weekValidatorService.setValidYearWeekString(null);
      return null;
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return this.weekUtilityService.getYearWeekStringFromDate(date);
  }

  private getDate(value: string): NgbDateStruct | null {
    if (value.length > 7) {
      this.weekValidatorService.updateErrorMsg(WeekErrorState.toManyCharacters);
      return null;
    }

    const date = this.weekUtilityService.getDateFromYearWeekString(value);

    if (date === null && this.weekValidatorService.weekIsRequired) {
      this.weekValidatorService.updateErrorMsg(WeekErrorState.weekIsRequired);
      return null;
    }

    if (date === null) {
      return { year: -1, month: -1, day: -1 };
    }

    this.weekValidatorService.setValidYearWeekString(value);
    return date;
  }
}
