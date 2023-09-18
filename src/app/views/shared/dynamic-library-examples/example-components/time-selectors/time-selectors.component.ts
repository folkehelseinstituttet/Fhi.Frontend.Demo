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

  minDate = new Date('July 20, 2019 00:00:00');
  maxDate = new Date('July 20, 2026 00:00:00');
  
  initialDate = new Date().toISOString();
  selectedDateISO = this.initialDate;

  selectedFromYear: number;
  selectedToYear: number;
  selectedYear: number;
  selectedWeek: number;

  constructor(private calendar: NgbCalendar) {}


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

  getDate(date: string) {
    this.selectedDateISO = date;
  }

  klikk() {
    console.log(this.selectedDateISO);
  }

  generateWeekList = () => {
    for (let i = 1; i <= 53; i++) {
      this.weekList.push({ id: i, name: 'Uke ' + i });
    }
  }

}
