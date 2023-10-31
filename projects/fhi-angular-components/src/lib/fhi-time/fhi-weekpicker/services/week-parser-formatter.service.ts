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
      return this.getDate(value);
    }
    this.handleValidationIfValueIsRequired();
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return this.weekUtilityService.getYearWeekStringFromDate(date);
  }

  private getDate(value: string): NgbDateStruct | null {
    if (value.length > 7) {
      this.weekValidatorService.setErrorMsg(WeekErrorState.toManyCharacters);
      return null;
    }
    const date = this.weekUtilityService.getDateFromYearWeekString(value);

    if (date === null) {
      return { year: -1, month: -1, day: -1 };
    }
    this.weekValidatorService.setValidYearWeekString(value);
    this.weekValidatorService.isValid = true;
    return date;
  }

  private handleValidationIfValueIsRequired() {
    if (this.weekValidatorService.weekIsRequired) {
      this.weekValidatorService.setErrorMsg(WeekErrorState.weekIsRequired);
    } else {
      this.weekValidatorService.isValid = true;
    }
  }

}
