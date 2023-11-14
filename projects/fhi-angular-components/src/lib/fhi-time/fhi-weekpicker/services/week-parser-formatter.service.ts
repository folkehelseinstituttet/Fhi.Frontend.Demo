import { Injectable } from '@angular/core';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { WeekValidationService } from './week-validator.service';
import { WeekUtilityService } from './week-utility.service';

/**
 * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
 */
@Injectable()
export class WeekParserFormatterService extends NgbDateParserFormatter {
  constructor(
    private weekValidationService: WeekValidationService,
    private utilityService: WeekUtilityService,
  ) {
    super();
  }

  parse(value: string): NgbDateStruct | null {
    this.weekValidationService.setUnvalidatedYearWeekString(value);
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return this.utilityService.getYearWeekStringFromDate(date);
  }
}
