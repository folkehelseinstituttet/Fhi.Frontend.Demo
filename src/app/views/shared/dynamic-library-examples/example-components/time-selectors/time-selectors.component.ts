import { Component, Input } from '@angular/core';

import { LibraryItemsShared } from '../../../models/library-item.model';

@Component({
  selector: 'app-time-selectors', 
  templateUrl: './time-selectors.component.html',
})
export class TimeSelectorsComponent {
  @Input() itemId!: string;
  @Input() items!: LibraryItemsShared;

  minDate = '2020-09-20';
  maxDate = '2030-09-20';
  
  today = new Date().toISOString();
  selectedDate = this.today;
  selectedDateAndTime: string;

  selectedFromYear: number;
  selectedToYear: number;
  selectedYear: number;

  yearSelected: string;

  week = '2015-53';

  onYearSelect(year: string) {
    this.yearSelected = year;
  }

  getDate(date: any) {
    this.selectedDate = date;
  }
  
  getDateAndTime(dateAndTime: any) {
    this.selectedDateAndTime = dateAndTime;
  }

  onWeekSelect(week: any) {
    console.log(week);
  }

}
