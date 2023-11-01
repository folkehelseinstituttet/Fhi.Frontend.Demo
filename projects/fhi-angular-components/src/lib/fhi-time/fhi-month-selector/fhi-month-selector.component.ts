import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { toNumber } from 'lodash-es';

import { FhiAutosuggestModule } from '../../fhi-autosuggest/fhi-autosuggest.module';
import { FhiAutosuggestItem } from '../../fhi-autosuggest/fhi-autosuggest.model';
import { FhiYearSelectorComponent } from '../../fhi-year-selector/fhi-year-selector.component';
import { FhiConstantsService } from '../../shared-services/fhi-constants.service';

@Component({
  selector: 'fhi-month-selector',
  standalone: true,
  imports: [
    CommonModule,
    FhiAutosuggestModule,
    FhiYearSelectorComponent
  ],
  templateUrl: './fhi-month-selector.component.html',
  providers: [ FhiConstantsService ]
})
export class FhiMonthSelectorComponent {
  @Input() labelYear: string = 'År';
  @Input() labelMonth: string = 'Måned';
  @Input() maxYear: number = this.FHI_CONSTANTS.MAX_YEAR;
  @Input() minYear: number = this.FHI_CONSTANTS.MIN_YEAR;
  @Input() month: number;
  @Input() year: string;

  @Output() monthSelect = new EventEmitter<any>();

  monthList: FhiAutosuggestItem[] = [];
  monthNames: string[] = ['Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Desember'];

  selectedMonth: FhiAutosuggestItem;
  selectedYear: FhiAutosuggestItem;

  constructor(private FHI_CONSTANTS: FhiConstantsService) {}

  ngOnInit() {
    this.populateMonthList();
  }

  onYearSelect(yearName: string) {
    console.log(yearName);
  }

  onSelectedMonth(monthId: number) {
    this.selectedMonth = this.monthList.find((month: FhiAutosuggestItem) => month.id === monthId);
    console.log(this.selectedMonth);
  }

  private populateMonthList() {
    this.monthList = [];
    for (let i = 1; i <= 12; i++) {
      const month: string = `${i}`;
      this.monthList.push({
        id: toNumber(month),
        name: this.monthNames[i-1]
      });
    }
    if (this.month) {
      this.selectedMonth = this.monthList.find((month: FhiAutosuggestItem) => month.id === this.month);
    }
  }
}
