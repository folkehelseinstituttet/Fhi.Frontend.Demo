import { Injectable } from '@angular/core';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { DateUtilityService } from './date-utility.service';
import { DateValidationService } from './date-validator.service';

/**
 * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
 */
@Injectable()
export class DateParserFormatterService extends NgbDateParserFormatter {
  constructor(
    private dateValidationService: DateValidationService,
    private dateUtilityService: DateUtilityService,
  ) {
    super();
  }

  parse(value: string): NgbDateStruct | null {
    // console.warn('parse(value):', value);
    this.dateValidationService.setUnvalidatedDateString(value);
    return null;
  }

  format(date: NgbDateStruct | null): string {
    // console.warn('format(date):', date);
    if (date) {
      return this.dateUtilityService.getLocalDateString(date);
    }
    return '';
  }
}
