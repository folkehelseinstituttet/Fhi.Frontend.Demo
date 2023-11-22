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
  @Input() month: FhiMonth = { year: undefined, month: undefined };

  @Output() monthSelect = new EventEmitter<FhiMonth>();

  minYear = this.getMinYear();
  maxYear = this.getMaxYear();
  years: number[];
  monthId: number;
  monthItems!: FhiAutosuggestItem[];

  ngOnInit() {
    this.monthItems = this.getMonthItems();
    this.years = [this.month.year];
    this.monthId = this.month.month;
  }

  onYearsSelect(years: number[]) {
    this.years = years;
    this.validateAndEmit();
  }

  onSelectedItemChange(monthId: number) {
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

  private getMinYear() {
    return 1900;
  }

  private getMaxYear() {
    return getYear(new Date());
  }
}
