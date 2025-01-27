import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { getYear } from 'date-fns';

import { FhiAutosuggestComponent } from '../../fhi-autosuggest/fhi-autosuggest.component';
import { FhiAutosuggestItem } from '../../fhi-autosuggest/fhi-autosuggest.model';
import { FhiYearsComponent } from '../fhi-years/fhi-years.component';
import { FhiMonth } from '../shared/models/fhi-month.model';
import { I18nService } from '../shared/i18n/i18n.service';
import { LocaleValues } from '../shared/i18n/locale-values.model';

@Component({
  selector: 'fhi-year-month',
  standalone: true,
  imports: [CommonModule, FhiAutosuggestComponent, FhiYearsComponent],
  templateUrl: './fhi-year-month.component.html',
  providers: [I18nService],
})
export class FhiYearMonthComponent implements OnInit {
  private i18n: LocaleValues;

  @Input() month: FhiMonth = { year: undefined, month: undefined };

  @Output() monthSelect = new EventEmitter<FhiMonth>();

  minYear = this.getMinYear();
  maxYear = this.getMaxYear();
  years: number[];
  monthId: number;
  monthItems!: FhiAutosuggestItem[];

  constructor(private i18nService: I18nService) {
    this.i18n = this.i18nService.getI18nValues();
  }

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
    const monthNames = this.i18n.monthFullNames;
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
