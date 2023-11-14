import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { toNumber } from 'lodash-es';

import { FhiAutosuggestModule } from '../../fhi-autosuggest/fhi-autosuggest.module';
import { FhiAutosuggestItem } from '../../fhi-autosuggest/fhi-autosuggest.model';
import { FhiYearsComponent } from '../fhi-years/fhi-years.component';
import { FhiConstantsService } from '../../shared-services/fhi-constants.service';
import { FhiMonth } from '../fhi-month.model';

@Component({
  selector: 'fhi-year-month',
  standalone: true,
  imports: [CommonModule, FhiAutosuggestModule, FhiYearsComponent],
  templateUrl: './fhi-year-month.component.html',
  providers: [FhiConstantsService],
})
export class FhiYearMonthComponent implements OnInit {
  @Input() maxYear: number = this.FHI_CONSTANTS.MAX_YEAR;
  @Input() minYear: number = this.FHI_CONSTANTS.MIN_YEAR;
  @Input() months: FhiMonth[];

  @Output() monthSelect = new EventEmitter<FhiMonth[]>();

  month!: number;
  years!: number[];

  monthList: FhiAutosuggestItem[] = [];
  monthNames: string[] = [
    'Januar',
    'Februar',
    'Mars',
    'April',
    'Mai',
    'Juni',
    'Juli',
    'August',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];

  selectedMonth: FhiAutosuggestItem;
  selectedYear: FhiAutosuggestItem;

  constructor(private FHI_CONSTANTS: FhiConstantsService) {}

  ngOnInit() {
    this.updateMonthItems();
    // this.populateMonthList();
  }

  onYearSelect(years: number[]) {
    console.log('years', years);
    // this.year = yearName;
    // this.concatenateYearDate();
  }

  onItemSelectChange(month: number) {
    console.log('month', month);
  }

  onSelectedMonth(monthId: number) {
    this.selectedMonth = this.monthList.find(
      (month: FhiAutosuggestItem) => month.id === monthId,
    );
    // this.concatenateYearDate();
  }

  private updateMonthItems() {
    console.log('Update!');
  }

  // private populateMonthList() {
  //   this.monthList = [];
  //   for (let i = 1; i <= 12; i++) {
  //     const month: string = `${i}`;
  //     this.monthList.push({
  //       id: toNumber(month),
  //       name: this.monthNames[i - 1],
  //     });
  //   }
  //   if (this.month) {
  //     this.selectedMonth = this.monthList.find(
  //       (month: FhiAutosuggestItem) => month.id === this.month,
  //     );
  //   }
  // }

  // private concatenateYearDate() {
  //   if (this.year && this.selectedMonth) {
  //     this.monthSelect.emit(this.year + '-' + this.selectedMonth.id);
  //   }
  // }
}
