import { Component, EventEmitter, Input, Output } from '@angular/core';

import { FhiYearsComponent } from '../fhi-years/fhi-years.component';
import { FhiYearRange } from './fhi-year-range.model';
import { RangeContext } from '../range-context.enum';

import { FhiConstantsService } from '../../shared-services/fhi-constants.service';

@Component({
  selector: 'fhi-year-range',
  standalone: true,
  templateUrl: './fhi-year-range.component.html',
  imports: [FhiYearsComponent],
  providers: [FhiConstantsService],
})
export class FhiYearRangeComponent {
  @Input() maxYear: number = this.FHI_CONSTANTS.MAX_YEAR;
  @Input() minYear: number = this.FHI_CONSTANTS.MIN_YEAR;

  @Output() yearRangeSelect = new EventEmitter<FhiYearRange>();

  labelFromYear = 'Fra år';
  labelToYear = 'Til år';
  fromYear: number;
  toYear: number;
  rangeContext = RangeContext;

  constructor(private FHI_CONSTANTS: FhiConstantsService) {}

  onYearsSelect(years: number[], context: number) {
    if (context === RangeContext.from) {
      this.updateMinYearAndFromYear(years[0]);
    } else {
      this.updateMaxYearAndToYear(years[0]);
    }
    if (this.fromYear && this.toYear) {
      this.yearRangeSelect.emit(this.getRange());
    }
  }

  private updateMinYearAndFromYear(year: number) {
    this.minYear = year;
    this.fromYear = year;
  }

  private updateMaxYearAndToYear(year: number) {
    this.maxYear = year;
    this.toYear = year;
  }

  private getRange() {
    return {
      from: this.fromYear,
      to: this.toYear,
    };
  }
}
