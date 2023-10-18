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

  weekSelected: string;

  yearList = [
    { id: 1, name: '2020' },
    { id: 2, name: '2021' },
    { id: 3, name: '2022' },
    { id: 4, name: '2023' },
    { id: 5, name: '2024' }
  ];

  weekList = [];

  selectedWeek!: string;
  week = '2019-53';

  ngOnInit() {
    this.generateWeekList();
  }

  getDate(date: any) {
    this.selectedDate = date;
  }
  
  getDateAndTime(dateAndTime: any) {
    this.selectedDateAndTime = dateAndTime;
  }

  getTheWeek(week: any) {
    console.log(week);
    this.weekSelected = week;
  }

  generateWeekList = () => {
    for (let i = 1; i <= 53; i++) {
      this.weekList.push({ id: i, name: 'Uke ' + i });
    }
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
