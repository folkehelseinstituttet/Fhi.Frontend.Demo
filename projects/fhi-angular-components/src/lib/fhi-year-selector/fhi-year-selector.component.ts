import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FhiAutosuggestModule } from '../fhi-autosuggest/fhi-autosuggest.module';

@Component({
  selector: 'fhi-year-selector',
  standalone: true,
  templateUrl: './fhi-year-selector.component.html',
  imports: [FhiAutosuggestModule]
})
export class FhiYearSelectorComponent {
  @Input() initialYearList: number[];

  @Output() selectedYearChange = new EventEmitter<number>();

  yearList: [] | any = [];
  selectedYear: number;
  uniqueId: string = 'yearselect_' + Math.random().toString(36).substring(2, 20);

  ngOnInit() {
    this.populateYearList();
  }

  selectedItem() {
    this.selectedYearChange.emit(this.selectedYear);
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
  }
}
