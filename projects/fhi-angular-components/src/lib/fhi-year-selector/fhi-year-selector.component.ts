import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FhiAutosuggestModule } from '../fhi-autosuggest/fhi-autosuggest.module';
import { FhiAutosuggestItem } from '../fhi-autosuggest/fhi-autosuggest.model';
import { toNumber } from 'lodash-es';

@Component({
  selector: 'fhi-year-selector',
  standalone: true,
  templateUrl: './fhi-year-selector.component.html',
  imports: [FhiAutosuggestModule]
})
export class FhiYearSelectorComponent {
  @Input() label: string = 'År';
  @Input() year: string;

  @Output() yearSelect = new EventEmitter<string>();

  yearList: FhiAutosuggestItem[] = [];

  selectedYear: FhiAutosuggestItem;
  selectedYearId: number;

  ngOnInit() {
    this.populateYearList();
  }
  
  onSelectedItemChange(selectedYearId: number) {
    this.selectedYear = this.yearList
      .find((year: FhiAutosuggestItem) => year.id === selectedYearId);
    this.yearSelect.emit(this.selectedYear.name);
  }

  private populateYearList() {
    for (let i = 1900; i <= 2050; i++) {
      const year: string = `${i}`;
      this.yearList.push({
        id: toNumber(year),
        name: year
      });
    }
    if (this.year) {
      this.selectedYear = this.yearList.find((year: FhiAutosuggestItem) => year.name === this.year);
      this.selectedYearId = this.selectedYear.id;
    }
  }
}
