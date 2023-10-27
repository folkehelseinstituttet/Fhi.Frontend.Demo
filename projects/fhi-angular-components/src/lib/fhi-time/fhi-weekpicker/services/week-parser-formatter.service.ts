import { Injectable } from "@angular/core";
import {
  NgbDateParserFormatter,
  NgbDateStruct,
} from "@ng-bootstrap/ng-bootstrap";

import { WeekErrorState, WeekValidationContext, WeekValidatorService } from "./week-validator.service";
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
    this.weekValidatorService.setValidationContext(WeekValidationContext.weekParserFormatterParse);

    if (value) {

      if (value.length > 7) {
        this.weekValidatorService.setErrorMsg(WeekErrorState.toManyCharacters);
        return null;
      }

      // TODO: don't test for toFewCharacters here, do it in getDateFromYearWeekString()
      if (value.length > 1 && value.length < 6) {
        this.weekValidatorService.setErrorMsg(WeekErrorState.toFewCharacters);
        return null;
      }

      const date = this.weekUtilityService.getDateFromYearWeekString(value);

      if (date === null) {
        return { year: -1, month: -1, day: -1 };
      }

      this.weekValidatorService.setValidYearWeekStringAndSharedValidState(value);
      return date;
    }


    // TODO: is there a better way to solve this problem?
    if (this.weekValidatorService.weekIsRequired) {
      this.weekValidatorService.setErrorMsg(WeekErrorState.weekIsRequired);
    } else {
      this.weekValidatorService.isValid = true;
    }


    return null;
  }

  format(date: NgbDateStruct | null): string {
    return this.weekUtilityService.getYearWeekStringFromDate(date);
  }
}
