import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FhiAutosuggestModule } from '../../fhi-autosuggest/fhi-autosuggest.module';
import { FhiAutosuggestItem } from '../../fhi-autosuggest/fhi-autosuggest.model';
import { FhiYearsComponent } from '../fhi-years/fhi-years.component';
import { FhiConstantsService } from '../../shared-services/fhi-constants.service';
import { RangeContext } from '../range-context.enum';
import { getYear } from 'date-fns';
import { FhiMonth } from '../fhi-month.model';
import { FhiTimeConstants } from '../fhi-time-constants';

@Component({
  selector: 'fhi-year-month-range',
  standalone: true,
  imports: [CommonModule, FhiAutosuggestModule, FhiYearsComponent],
  templateUrl: './fhi-year-month-range.component.html',
  providers: [FhiConstantsService],
})
export class FhiYearMonthRangeComponent implements OnInit {
  // TODO
  // @Input() minMonth: FhiMonth;
  // @Input() maxMonth: FhiMonth;
  @Input() id = this.getRandomId();
  @Input() monthRange: FhiMonth = { year: undefined, month: undefined };

  @Output() monthRangeSelect = new EventEmitter<object>();

  constants = this.getConstants();
  minYear = this.getMinYear();
  maxYear = this.getMaxYear();
  years: number[];
  rangeContext = RangeContext;
  monthId: number;
  monthItems!: FhiAutosuggestItem[];
  isValid = true;

  ngOnInit() {
    this.monthItems = this.getMonthItems();
  }

  onYearSelect(years: number[], context: number) {
    if (context === RangeContext.from) {
      // this.updateFromYear(year[0]);
    } else {
      // this.updateToYear(year[0]);
    }
    this.validateAndEmit();
  }

  onItemSelectChange(monthId: number, context: number) {
    if (context === RangeContext.from) {
      // this.updateFromYear(year[0]);
    } else {
      // this.updateToYear(year[0]);
    }
    this.validateAndEmit();
  }

  private validateAndEmit() {
    if (this.years && this.monthId) {
      this.monthRangeSelect.emit({
        to: {
          year: this.years[0],
          month: this.monthId,
        },
        from: {
          year: this.years[0],
          month: this.monthId,
        },
      });
    }
  }

  private getMonthItems() {
    const monthNames = FhiTimeConstants.monthNames;
    const monthItems = [];
    for (let i = 1; i <= 12; i++) {
      monthItems.push({
        id: i,
        name: monthNames[i - 1],
      });
    }
    return monthItems;
  }

  private getConstants() {
    return {
      fieldsetLegendFrom: 'Fra måned',
      fieldsetLegendTo: 'Til måned',
      labelMonth: 'måned',
      labelYear: 'år',
      notFoundText: 'Ugyldig måned',
    };
  }

  private getMinYear() {
    return 1900;
  }

  private getMaxYear() {
    return getYear(new Date());
  }

  private getRandomId() {
    return `id${Math.floor(Math.random() * Math.pow(10, 8))}`;
  }
}
