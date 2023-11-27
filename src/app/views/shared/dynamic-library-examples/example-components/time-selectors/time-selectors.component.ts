import { Component, Input } from '@angular/core';

import { LibraryItemsShared } from '../../../models/library-item.model';
import { FhiDate } from '@folkehelseinstituttet/angular-components';
import { FhiMonth } from '@folkehelseinstituttet/angular-components';

@Component({
  selector: 'app-time-selectors',
  templateUrl: './time-selectors.component.html',
})
export class TimeSelectorsComponent {
  @Input() itemId!: string;
  @Input() items!: LibraryItemsShared;

  // Datepicker
  date: FhiDate;
  minDate: FhiDate;
  maxDate: FhiDate;

  //
  // Datepicker
  //

  updateDate() {
    const date1: FhiDate = { year: 2019, month: 9, day: 11 };
    const date2: FhiDate = { year: 2020, month: 10, day: 23 };
    this.date = this.date?.year !== date1.year ? date1 : date2;
  }

  updateMinDate() {
    const date1 = { year: 2010, month: 1, day: 1 };
    const date2 = { year: 2015, month: 1, day: 1 };
    this.minDate = this.minDate?.year !== date1.year ? date1 : date2;
  }

  updateMaxDate() {
    const date1 = { year: 2023, month: 1, day: 1 };
    const date2 = { year: 2020, month: 1, day: 1 };
    this.maxDate = this.maxDate?.year !== date1.year ? date1 : date2;
  }

  onDateSelect(date: FhiDate) {
    console.info(date);
  }

  //
  // Date range
  //

  getDateRange(dateRange: any) {
    console.info(dateRange);
  }

  //
  // Date time
  //

  getDateAndTime(dateAndTime: any) {
    console.info(dateAndTime);
  }

  //
  // Weekpicker
  //

  onWeekSelect(week: any) {
    console.info(week);
  }

  //
  // Week range
  //

  onWeekRangeSelect(weekRange: any) {
    console.info(weekRange);
  }

  // Month

  onMonthSelect(month: FhiMonth) {
    console.info(month);
  }

  //
  // Month range
  //

  onMonthRangeSelect(monthRange: object) {
    console.info(monthRange);
  }

  //
  // Years
  //

  onYearSelect(year: number[]) {
    console.info(year);
  }

  //
  // Year range
  //

  onYearRangeSelect(yearRange: any) {
    console.info(yearRange);
  }
}
