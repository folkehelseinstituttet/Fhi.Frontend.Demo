import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { getYear } from 'date-fns';

import { FhiAutosuggestModule } from '../../fhi-autosuggest/fhi-autosuggest.module';
import { FhiAutosuggestItem } from '../../fhi-autosuggest/fhi-autosuggest.model';
import { FhiYearsComponent } from '../fhi-years/fhi-years.component';
import { FhiMonth } from '../fhi-month.model';

import { FhiTimeConstants } from '../fhi-time-constants';

@Component({
  selector: 'fhi-year-month',
  standalone: true,
  imports: [CommonModule, FhiAutosuggestModule, FhiYearsComponent],
  templateUrl: './fhi-year-month.component.html',
})
export class FhiYearMonthComponent implements OnInit {
  @Input() minMonth: FhiMonth;
  @Input() maxMonth: FhiMonth;
  @Input() month: FhiMonth = { year: undefined, month: undefined };

  @Output() monthSelect = new EventEmitter<FhiMonth>();

  minYear = this.getMinYear();
  maxYear = this.getMaxYear();
  monthId: number;
  monthItems!: FhiAutosuggestItem[];
  years: number[];

  ngOnInit() {
    this.updateMonthItems();
  }
  // TODO: ngOnChanges (see weekpicker)

  onYearSelect(years: number[]) {
    this.years = years;
    this.validateAndEmit();
  }

  onItemSelectChange(monthId: number) {
    this.monthId = monthId;
    this.validateAndEmit();
  }

  private validateAndEmit() {
    // TODO: validation (see weekpicker)
    if (this.years && this.monthId) {
      this.monthSelect.emit({
        year: this.years[0],
        month: this.monthId,
      });
    }
  }

  private updateMonthItems() {
    const monthNames = FhiTimeConstants.monthNames;
    this.monthItems = [];
    for (let i = 1; i <= 12; i++) {
      this.monthItems.push({
        id: i,
        name: monthNames[i - 1],
      });
    }
  }

  // TODO: move into global fhi-time service
  private getMinYear() {
    return 1900;
  }

  // TODO: move into global fhi-time service
  private getMaxYear() {
    return getYear(new Date());
  }
}
