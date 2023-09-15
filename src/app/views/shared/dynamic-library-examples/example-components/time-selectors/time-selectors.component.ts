import { Component, Injectable, Input } from '@angular/core';

import { LibraryItemsShared } from '../../../models/library-item.model';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-time-selectors',
  templateUrl: './time-selectors.component.html',
})
export class TimeSelectorsComponent {
  @Input() itemId!: string;
  @Input() items!: LibraryItemsShared;

  minDate = { year: 2020, month: 1, day: 1 };
  maxDate = { year: 2030, month: 12, day: 31 };
  
  selectedFromYear: number;
  selectedToYear: number;
  selectedYear: number;
  selectedWeek: number;

  constructor(private calendar: NgbCalendar) {}

  selectedDay = this.calendar.getToday();

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

  generateWeekList = () => {
    for (let i = 1; i <= 53; i++) {
      this.weekList.push({ id: i, name: 'Uke ' + i });
    }
  }

}
