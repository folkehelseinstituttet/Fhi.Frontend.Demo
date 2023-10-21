import { Injectable } from "@angular/core";
import {
  NgbDateParserFormatter,
  NgbDateStruct,
} from "@ng-bootstrap/ng-bootstrap";

import { WeekErrorStates, WeekValidatorService } from "./week-validator.service";
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
    this.weekValidatorService.setValidationTriggeredByParser(true);

    if (value) {

      if (value.length > 7) {
        this.weekValidatorService.setErrorMsg(WeekErrorStates.toManyCharacters);
        return;
      }
      if (value.length > 1 && value.length < 6) {
        this.weekValidatorService.setErrorMsg(WeekErrorStates.toFewCharacters);
        return;
      }
      const date = this.weekUtilityService.getDateFromYearWeekString(value);

      if (date === null) {
        return { year: -1, month: -1, day: -1 };
      }

      this.weekValidatorService.validYearWeekString = value;
      return date;
    }

    if (this.weekValidatorService.weekIsRequired) {
      this.weekValidatorService.setErrorMsg(WeekErrorStates.weekIsRequired);
    } else {
      this.weekValidatorService.isValid = true;
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return this.weekUtilityService.getYearWeekStringFromDate(date);
  }
}
