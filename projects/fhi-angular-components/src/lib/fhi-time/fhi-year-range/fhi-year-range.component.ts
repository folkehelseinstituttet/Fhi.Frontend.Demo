import { Component, EventEmitter, Input, Output } from '@angular/core';

import { FhiYearsComponent } from '../fhi-years/fhi-years.component';
import { FhiYearRange } from '../shared/models/fhi-year-range.model';
import { RangeContext } from '../shared/range-context.enum';

import { TimeConstants } from '../shared/time.constants';

@Component({
  selector: 'fhi-year-range',
  standalone: true,
  templateUrl: './fhi-year-range.component.html',
  imports: [FhiYearsComponent],
})
export class FhiYearRangeComponent {
  @Input() minYear: number = TimeConstants.minYear;
  @Input() maxYear: number = TimeConstants.maxYear;

  @Output() yearRangeSelect = new EventEmitter<FhiYearRange>();

  labelFromYear = 'Fra år';
  labelToYear = 'Til år';
  fromYear: number;
  toYear: number;
  rangeContext = RangeContext;

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
