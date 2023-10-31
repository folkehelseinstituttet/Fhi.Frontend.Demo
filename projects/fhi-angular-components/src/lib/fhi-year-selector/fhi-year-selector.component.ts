import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FhiAutosuggestModule } from '../fhi-autosuggest/fhi-autosuggest.module';
import { FhiAutosuggestItem } from '../fhi-autosuggest/fhi-autosuggest.model';

import { FhiConstantsService } from '../shared-services/fhi-constants.service';

import { toNumber } from 'lodash-es';

@Component({
  selector: 'fhi-year-selector',
  standalone: true,
  templateUrl: './fhi-year-selector.component.html',
  imports: [ FhiAutosuggestModule ],
  providers: [ FhiConstantsService ]
})
export class FhiYearSelectorComponent {
  @Input() label: string = 'År';
  @Input() maxYear: number = this.FHI_CONSTANTS.MAX_YEAR;
  @Input() minYear: number = this.FHI_CONSTANTS.MIN_YEAR;
  @Input() year: string;
  
  @Output() yearSelect = new EventEmitter<string>();

  yearList: FhiAutosuggestItem[] = [];
  
  selectedYear: FhiAutosuggestItem;
  selectedYearId: number;

  constructor(private FHI_CONSTANTS: FhiConstantsService) {}

  ngOnInit() {
    this.populateYearList();
  }

  ngOnChanges() {
    this.populateYearList();
  }
  
  onSelectedItemChange(selectedYearId: number) {
    this.selectedYear = this.yearList
      .find((year: FhiAutosuggestItem) => year.id === selectedYearId);
    this.yearSelect.emit(this.selectedYear.name);
  }

  private populateYearList() {
    this.yearList = [];
    for (let i = this.minYear; i <= this.maxYear; i++) {
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
