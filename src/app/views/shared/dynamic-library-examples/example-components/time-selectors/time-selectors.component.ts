import { Component, Input } from '@angular/core';

import { LibraryItemsShared } from '../../../models/library-item.model';
import { FhiMonth } from '@folkehelseinstituttet/angular-components';

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
  selectedDateRange: any;
  selectedFromYear: number;
  selectedToYear: number;
  selectedYear: number;
  selectedYearRange: any;
  weekFrom = '2010-27';
  weekTo = '2013-13';
  weekRange: any;

  // weekSelected: string;
  // weekList = [];

  selectedWeek!: string;
  week = '2019-25';

  // ngOnInit() {
  //   this.generateWeekList();
  // }

  getDate(date: any) {
    this.selectedDate = date;
  }

  getDateRange(dateRange: any) {
    this.selectedDateRange = dateRange;
  }

  getDateAndTime(dateAndTime: any) {
    this.selectedDateAndTime = dateAndTime;
  }

  // getTheWeek(week: any) {
  //   console.log(week);
  //   this.weekSelected = week;
  // }

  // generateWeekList = () => {
  //   for (let i = 1; i <= 53; i++) {
  //     this.weekList.push({ id: i, name: 'Uke ' + i });
  //   }
  // }

  onWeekSelect(week: any) {
    console.info(week);
  }

  onWeekRangeSelect(weekRange: any) {
    console.info(weekRange);
  }

  onMonthSelect(month: FhiMonth) {
    console.info(month);
  }

  onMonthRangeSelect(monthRange: object) {
    console.info(monthRange);
  }

  onYearSelect(year: number[]) {
    console.info(year);
  }

  onYearRangeSelect(yearRange: any) {
    console.info(yearRange);
  }
}
