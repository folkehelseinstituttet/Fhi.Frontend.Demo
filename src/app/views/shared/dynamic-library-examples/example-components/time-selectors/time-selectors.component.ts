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

  // weekSelected: string;

  yearSelected: string;

  // yearList = ['2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027'];

  // weekList = [];

  selectedWeek!: string;
  week = '2015-53';

  // ngOnInit() {
  //   this.generateWeekList();
  // }

  onYearSelect(year: string) {
    this.yearSelected = year;
  }

  getDate(date: any) {
    this.selectedDate = date;
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
    this.selectedWeek = week;
  }

  changeWeekInput() {
    const a = '2019-53';
    const b = '2018-3';
    this.week = (this.week === a) ? b : a;
  }

}
