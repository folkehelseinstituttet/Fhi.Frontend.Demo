import { Injectable } from '@angular/core';
import {
  NgbDateParserFormatter,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';

import { WeekValidationService } from './week-validator.service';
import { WeekUtilityService } from './week-utility.service';

/**
 * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
 */
@Injectable()
export class WeekParserFormatterService extends NgbDateParserFormatter {
  constructor(
    private weekValidationService: WeekValidationService,
    private utilityService: WeekUtilityService
  ) {
    super();
  }

  parse(value: string): NgbDateStruct | null {
    // console.warn('parse(value):', value);
    this.weekValidationService.setUnvalidatedYearWeekString(value);
    return null;
  }

  format(date: NgbDateStruct | null): string {
    // console.warn('format(date):', date);
    return this.utilityService.getYearWeekStringFromDate(date);
  }
}
