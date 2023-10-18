import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FhiAutosuggestModule } from '../fhi-autosuggest/fhi-autosuggest.module';

@Component({
  selector: 'fhi-year-selector',
  standalone: true,
  templateUrl: './fhi-year-selector.component.html',
  imports: [FhiAutosuggestModule]
})
export class FhiYearSelectorComponent {
  @Input() initialSelectedYear: string;
  @Input() initialYearList: string[];
  @Input() label: string = 'År';

  @Output() selectedYearChange = new EventEmitter<number>();

  yearList: [] | any = [];
  selectedYear: string;
  selectedYearId: number;
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
    if (this.initialYearList === undefined) {
      for (let i = 1900; i <= 2050; i++) {
        const year: string = `${i}`;
        const idYear = { id: this.uniqueId + '_' + i, name: year };
        this.yearList.push(idYear);
      }
    } else {
      for (let i = 0; i < this.initialYearList.length; i++) {
        const year: string = `${this.initialYearList[i]}`;
        const idYear = { id: this.uniqueId + '_' + i, name: year };
        this.yearList.push(idYear);
      }
    }
    if (this.initialSelectedYear) {
      this.selectInitialYear();
    }
  }

  private selectInitialYear() {
    this.selectedYear = this.yearList.find((year: any) => year.name === this.initialSelectedYear);
    this.selectedYearId = this.selectedYear['id'];
    this.selectedYearChange.emit(this.selectedYear['name']);
  }
}
