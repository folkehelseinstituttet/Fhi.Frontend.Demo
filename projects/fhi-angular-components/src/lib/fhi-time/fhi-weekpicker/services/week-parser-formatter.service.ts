import { Injectable } from "@angular/core";
import {
  NgbDateParserFormatter,
  NgbDateStruct,
} from "@ng-bootstrap/ng-bootstrap";

import { FhiTimeUtilities } from "../../fhi-time-utilities";
import { WeekValidatorService } from "./week-validator.service";

/**
 * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
 */
@Injectable()
export class WeekParserFormatterService extends NgbDateParserFormatter {
  constructor(private weekValidatorService: WeekValidatorService) {
    super();
  }
  parse(value: string): NgbDateStruct | null {
    if (value) {

      // Error feedback on input
      if (value.length > 7) {
        this.weekValidatorService.validate();
      }

      const date = FhiTimeUtilities.getDateFromYearWeekString(value);

      if (date === null) {
        return { year: -1, month: -1, day: -1 };
      }
      return date;
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return FhiTimeUtilities.getYearWeekStringFromDate(date);
  }
}
