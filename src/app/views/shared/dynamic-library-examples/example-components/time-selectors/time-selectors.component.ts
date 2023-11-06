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
  selectedDateRange: any;
  selectedFromYear: number;
  selectedToYear: number;
  selectedYear: number;
  selectedYearRange: any;
  monthRangeSelected: any;
  weekFrom: string = '2010-27';
  weekTo: string = '2013-13';
  weekRange: any;

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

  getWeekRange(weekRange: any) {
    this.weekRange = weekRange;
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

  onWeekSelect(week: any) {
    this.selectedWeek = week;
  }

  changeWeekInput() {
    const a = '2019-53';
    const b = '2018-3';
    this.week = (this.week === a) ? b : a;
  }

}
