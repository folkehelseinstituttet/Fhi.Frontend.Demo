import { Component, Input } from '@angular/core';

import { LibraryItemsShared } from '../../../models/library-item.model';
import { FhiDate, FhiDateTime, FhiWeek, FhiMonth } from '@folkehelseinstituttet/angular-components';

@Component({
  selector: 'app-time-selectors',
  templateUrl: './time-selectors.component.html',
})
export class TimeSelectorsComponent {
  @Input() itemId!: string;
  @Input() items!: LibraryItemsShared;

  today = new Date();

  // Datepicker
  date: FhiDate;
  minDate: FhiDate;
  maxDate: FhiDate;

  // Date time
  dateTime: FhiDateTime = {
    date: {
      year: this.today.getFullYear(),
      month: this.today.getMonth() + 1,
      day: this.today.getDate(),
    },
    time: { hour: this.today.getHours(), minute: this.today.getMinutes(), second: 0 },
  };
  maxDateTime: FhiDate = { year: 2027, month: 12, day: 31 };
  minDateTime: FhiDate = { year: 2023, month: 1, day: 1 };

  // Weekpicker
  week: FhiWeek;
  minWeek: FhiWeek;
  maxWeek: FhiWeek;

  //
  // Datepicker
  //

  updateDate() {
    const date1 = { year: 2019, month: 9, day: 11 };
    const date2 = { year: 2020, month: 10, day: 23 };
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

  //
  // Date time
  //

  onDateTimeSelect(dateTime: FhiDateTime) {
    console.info(dateTime);
  }

  //
  // Weekpicker
  //

  updateWeek() {
    const week1 = { year: 2019, week: 52 };
    const week2 = { year: 2020, week: 23 };
    this.week = this.week?.year !== week1.year ? week1 : week2;
  }

  updateMinWeek() {
    const week1 = { year: 2010, week: 1 };
    const week2 = { year: 2015, week: 1 };
    this.minWeek = this.minWeek?.year !== week1.year ? week1 : week2;
  }

  updateMaxWeek() {
    const week1 = { year: 2023, week: 52 };
    const week2 = { year: 2020, week: 1 };
    this.maxWeek = this.maxWeek?.year !== week1.year ? week1 : week2;
  }

  onWeekSelect(week: FhiWeek) {
    console.info(week);
  }

  //
  // Week range
  //

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
