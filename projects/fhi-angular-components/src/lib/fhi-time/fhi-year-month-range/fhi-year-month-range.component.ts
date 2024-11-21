import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { getYear } from 'date-fns';

import { FhiAutosuggestComponent } from '../../fhi-autosuggest/fhi-autosuggest.component';
import { FhiAutosuggestItem } from '../../fhi-autosuggest/fhi-autosuggest.model';
import { FhiYearsComponent } from '../fhi-years/fhi-years.component';
import { RangeContext } from '../shared/range-context.enum';
import { FhiMonth } from '../shared/models/fhi-month.model';
import { FhiMonthRange } from '../shared/models/fhi-month-range.model';
import { I18nService } from '../shared/i18n/i18n.service';
import { LocaleValues } from '../shared/i18n/locale-values.model';

@Component({
  selector: 'fhi-year-month-range',
  standalone: true,
  imports: [CommonModule, FhiAutosuggestComponent, FhiYearsComponent],
  templateUrl: './fhi-year-month-range.component.html',
  providers: [I18nService],
})
export class FhiYearMonthRangeComponent implements OnInit {
  private i18n: LocaleValues;

  @Input() minMonth: FhiMonth;
  @Input() maxMonth: FhiMonth;

  @Output() monthRangeSelect = new EventEmitter<FhiMonthRange>();

  isValid = true;
  constants = this.getConstants();
  rangeContext = RangeContext;
  fromMonth: FhiMonth;
  toMonth: FhiMonth;
  fromMonthItems!: FhiAutosuggestItem[];
  toMonthItems!: FhiAutosuggestItem[];
  minYearTo: number;
  maxYearFrom: number;

  constructor(private i18nService: I18nService) {
    this.i18n = this.i18nService.getI18nValues();
  }

  ngOnInit() {
    if (this.minMonth === undefined) {
      this.minMonth = this.getMinFhiMonth();
    }
    if (this.maxMonth === undefined) {
      this.maxMonth = this.getMaxFhiMonth();
    }
    this.fromMonth = this.getFhiMonth();
    this.toMonth = this.getFhiMonth();

    this.minYearTo = this.minMonth.year;
    this.maxYearFrom = this.maxMonth.year;

    this.fromMonthItems = this.getMonthItems();
    this.toMonthItems = this.getMonthItems();
  }

  onYearSelect(years: number[], context: number) {
    if (context === RangeContext.from) {
      this.fromMonth.year = years[0];
      this.minYearTo = years[0];
    } else {
      this.toMonth.year = years[0];
      this.maxYearFrom = years[0];
    }
    this.updateMonthItems();
    this.validateAndEmit();
  }

  onSelectedItemChange(monthId: number, context: number) {
    if (context === RangeContext.from) {
      this.fromMonth.month = monthId;
    } else {
      this.toMonth.month = monthId;
    }
    this.updateMonthItems();
    this.validateAndEmit();
  }

  private canValidate(): boolean {
    if (this.fromMonth.year && this.toMonth.year && this.fromMonth.month && this.toMonth.month) {
      return true;
    }
    return false;
  }

  private validateAndEmit() {
    if (!this.canValidate()) {
      return;
    }
    const fromMonth = this.fromMonth.year * 100 + this.fromMonth.month;
    const toMonth = this.toMonth.year * 100 + this.toMonth.month;

    if (fromMonth > toMonth) {
      this.isValid = false;
      return;
    }
    this.isValid = true;
    this.monthRangeSelect.emit({
      from: this.fromMonth,
      to: this.toMonth,
    });
  }

  private updateMonthItems() {
    if (!this.fromMonth.year && !this.toMonth.year) {
      return;
    }
    if (this.fromMonth.year === this.toMonth.year) {
      this.updateFromMonthItems();
      this.updateToMonthItems();
      return;
    }
    if (this.fromMonthItems.length < 12) {
      this.fromMonthItems = this.getMonthItems();
    }
    if (this.toMonthItems.length < 12) {
      this.toMonthItems = this.getMonthItems();
    }
  }

  private updateFromMonthItems() {
    if (!this.toMonth.month) {
      return;
    }
    const n = 12 - this.toMonth.month; // Number of months after currently selected this.toMonth.month
    const sliceEnd = n > 0 ? -n : 12;
    this.fromMonthItems = this.getMonthItems().slice(0, sliceEnd);
  }

  private updateToMonthItems() {
    if (!this.fromMonth.month) {
      return;
    }
    this.toMonthItems = this.getMonthItems().slice(this.fromMonth.month - 1);
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

  private getConstants() {
    return {
      fieldsetLegendFrom: 'Fra måned',
      fieldsetLegendTo: 'Til måned',
      labelMonth: 'måned',
      labelYear: 'år',
      notFoundText: 'Ugyldig måned',
    };
  }

  private getMinFhiMonth(): FhiMonth {
    return { year: this.getMinYear(), month: 1 };
  }

  private getMaxFhiMonth(): FhiMonth {
    return { year: this.getMaxYear(), month: 12 };
  }

  private getFhiMonth(): FhiMonth {
    return { year: undefined, month: undefined };
  }
  private getMinYear() {
    return 1900;
  }

  private getMaxYear() {
    return getYear(new Date());
  }
}
