import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FhiAutosuggestModule } from '../fhi-autosuggest/fhi-autosuggest.module';

@Component({
  selector: 'fhi-year-selector',
  standalone: true,
  templateUrl: './fhi-year-selector.component.html',
  imports: [FhiAutosuggestModule]
})
export class FhiYearSelectorComponent {
  @Input() label: string = 'År';
  @Input() year: string;
  @Input() years: string[];

  @Output() selectedYearChange = new EventEmitter<number>();

  yearList: [] | any = [];
  selectedYear: string;
  selectedYearId: number;

  // Review comment: fixed "missing id bug" in FhiAutosuggestComponent, so uniqueId 
  //                 (and [labelForId]) can be skippet FhiYearSelectorComponent...
  uniqueId: string = 'yearselect_' + Math.random().toString(36).substring(2, 20);

  ngOnInit() {
    this.populateYearList();
  }
  
  getSelectedYear() {
    this.selectedYear = this.yearList.find((year: any) => year.id === this.selectedYearId);
    console.log(this.selectedYear);
    this.selectedYearChange.emit(this.selectedYear['name']);
  }

  private populateYearList() {
    if (this.years === undefined) {
      for (let i = 1900; i <= 2050; i++) {
        const year: string = `${i}`;
        const idYear = { id: this.uniqueId + '_' + i, name: year };
        this.yearList.push(idYear);
      }
    } else {
      for (let i = 0; i < this.years.length; i++) {
        const year: string = `${this.years[i]}`;
        const idYear = { id: this.uniqueId + '_' + i, name: year };
        this.yearList.push(idYear);
      }
    }
    if (this.year) {
      this.selectInitialYear();
    }
  }

  private selectInitialYear() {
    this.selectedYear = this.yearList.find((year: any) => year.name === this.year);
    this.selectedYearId = this.selectedYear['id'];
    this.selectedYearChange.emit(this.selectedYear['name']);
  }
}
