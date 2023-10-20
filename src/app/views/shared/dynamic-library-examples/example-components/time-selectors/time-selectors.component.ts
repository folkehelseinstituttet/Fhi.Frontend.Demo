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
  selectedWeek: number;

  yearSelected: string;

  // yearList = ['2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027'];

  weekList = [];

  ngOnInit() {
    this.generateWeekList();
  }

  onYearSelect(year: string) {
    this.yearSelected = year;
  }

  getDate(date: any) {
    this.selectedDate = date;
  }
  
  getDateAndTime(dateAndTime: any) {
    this.selectedDateAndTime = dateAndTime;
  }

  generateWeekList = () => {
    for (let i = 1; i <= 53; i++) {
      this.weekList.push({ id: i, name: 'Uke ' + i });
    }
  }

}
