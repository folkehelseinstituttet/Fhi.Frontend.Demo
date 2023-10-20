import { Injectable } from "@angular/core";
import {
  NgbDateParserFormatter,
  NgbDateStruct,
} from "@ng-bootstrap/ng-bootstrap";

import { WeekErrorStates } from "../week-error-states";
import { WeekValidatorService } from "./week-validator.service";
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

      if (value.length > 7) {
        this.weekValidatorService.isValid = false;
        this.weekValidatorService.setErrorMsg(value, WeekErrorStates.toManycharacters);
        return;
      }
      const date = this.weekUtilityService.getDateFromYearWeekString(value);

      if (date === null) {
        // console.log('WeekParserFormatterService, date 1', { year: -1, month: -1, day: -1 });
        this.weekValidatorService.isValid = false;
        this.weekValidatorService.setErrorMsg(value, WeekErrorStates.notValidWeek);
        // TODO: how to distinguish between WeekErrorStates.notValidWeek and
        //       WeekErrorStates.outside of minWeek/maxWeek
        return { year: -1, month: -1, day: -1 };
      }
      this.weekValidatorService.isValid = true;
      this.weekValidatorService.validYearWeekString = value;
      // console.log('WeekParserFormatterService, date 2', date);
      return date;
    }

    // TODO: how to handle no input if week is not required...
    console.log('WeekParserFormatterService, date 3', null);
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return this.weekUtilityService.getYearWeekStringFromDate(date);
  }
}
