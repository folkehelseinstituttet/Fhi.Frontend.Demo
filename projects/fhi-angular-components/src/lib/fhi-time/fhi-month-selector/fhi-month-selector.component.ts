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

  @Output() monthSelect = new EventEmitter<any>();

  yearList: FhiAutosuggestItem[] = [];
  monthList: FhiAutosuggestItem[] = [];
  month: string;
  monthNames: string[] = ['Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Desember'];

  selectedMonth: FhiAutosuggestItem;
  selectedMonthId: number;
  selectedYear: FhiAutosuggestItem;
  selectedYearId: number;

  constructor(private FHI_CONSTANTS: FhiConstantsService) {}

  ngOnInit() {
    this.populateMonthList();
  }

  onYearSelect(selectedYearId: string) {
    console.log(selectedYearId);
  }

  onSelectedItemChangeMonth(selectedMonthId: number) {
    console.log(selectedMonthId);
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
      this.selectedYear = this.monthList.find((month: FhiAutosuggestItem) => month.name === this.month);
      this.selectedYearId = this.selectedYear.id;
    }
  }
}
