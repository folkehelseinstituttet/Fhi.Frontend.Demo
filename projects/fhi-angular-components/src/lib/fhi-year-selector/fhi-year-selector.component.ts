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

  // Review comment: No need for years as @input, what we need is maxYear and minYear
  yearList: FhiAutosuggestItem[] = [];

  selectedYear: FhiAutosuggestItem;
  selectedYearId: number;

  // Review comment: fixed "missing id bug" in FhiAutosuggestComponent, so uniqueId 
  //                 (and [labelForId]) can be skippet FhiYearSelectorComponent...
  // uniqueId: string = 'yearselect_' + Math.random().toString(36).substring(2, 20);

  ngOnInit() {
    this.populateYearList();
  }
  
  onSelectedItemChange(selectedYearId: number) {
    // console.log('selectedYearId', selectedYearId);
    this.selectedYear = this.yearList
      .find((year: FhiAutosuggestItem) => year.id === selectedYearId);
    this.yearSelect.emit(this.selectedYear.name);
  }

  private populateYearList() {
    for (let i = 1900; i <= 2050; i++) {
      const year: string = `${i}`;
      this.yearList.push({
        // Review comment: My bad... the model FhiAutosuggestItem was wrong all the time; string-id's
        // has never worked, which is why you got problems with the emit-value.
        id: toNumber(year),
        name: year
      });
    }
    if (this.year) {
      this.selectedYear = this.yearList.find((year: FhiAutosuggestItem) => year.name === this.year);
      this.selectedYearId = this.selectedYear.id;
      // Review comment: we don't emit anything before user has interacted
      // this.selectInitialYear();
    }
  }

  // private selectInitialYear() {
  //   this.selectedYear = this.yearList.find((year: FhiAutosuggestItem) => year.name === this.year);
  //   this.selectedYearId = toNumber(this.selectedYear['id']);
  //   this.yearSelect.emit(this.selectedYear['name']);
  // }
}
