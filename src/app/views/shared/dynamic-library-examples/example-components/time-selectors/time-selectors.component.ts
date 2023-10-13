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

  yearList = [
    { id: 1, name: '2020' },
    { id: 2, name: '2021' },
    { id: 3, name: '2022' },
    { id: 4, name: '2023' },
    { id: 5, name: '2024' }
  ];

  weekList = [];

  ngOnInit() {
    this.generateWeekList();
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
