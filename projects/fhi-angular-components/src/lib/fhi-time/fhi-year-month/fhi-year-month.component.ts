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
  // TODO
  // @Input() minMonth: FhiMonth;
  // @Input() maxMonth: FhiMonth;

  @Input() month: FhiMonth = { year: undefined, month: undefined };

  @Output() monthSelect = new EventEmitter<FhiMonth>();

  minYear = this.getMinYear();
  maxYear = this.getMaxYear();
  years: number[];
  monthId: number;
  monthItems!: FhiAutosuggestItem[];

  ngOnInit() {
    this.updateMonthItems();
  }

  onYearSelect(years: number[]) {
    this.years = years;
    this.validateAndEmit();
  }

  onItemSelectChange(monthId: number) {
    this.monthId = monthId;
    this.validateAndEmit();
  }

  private validateAndEmit() {
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

  private getMinYear() {
    return 1900;
  }

  private getMaxYear() {
    return getYear(new Date());
  }
}
