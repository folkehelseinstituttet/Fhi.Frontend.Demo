import { Component, Input } from '@angular/core';

import { LibraryItemsShared } from '../../../models/library-item.model';
import { FhiWeek } from 'projects/fhi-angular-components/src/lib/fhi-time/fhi-weekpicker/fhi-week.model';
import { FhiWeekRange } from 'projects/fhi-angular-components/src/lib/fhi-time/fhi-week-range/fhi-week-range.model';

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
  monthRangeSelected: any;

  // weekSelected: string;

  yearSelected: string;
  monthSelected: string;

  // weekList = [];

  selectedWeek!: string;
  week = '2019-25';

  // ngOnInit() {
  //   this.generateWeekList();
  // }

  onYearSelect(year: string) {
    this.yearSelected = year;
  }

  onMonthSelect(yearMonth: string) {
    this.monthSelected = yearMonth;
  }

  onMonthRangeSelect(monthRange: Object) {
    this.monthRangeSelected = monthRange;
  }

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

  yearRangeSelect(yearRange: any) {
    this.selectedYearRange = yearRange;
  }

  onWeekSelect(week: FhiWeek) {
    console.info('Weekpicker example Output:', week);
  }

  onWeekRangeSelect(weekRange: FhiWeekRange) {
    console.info('Week range example Output:', weekRange);
  }
}
