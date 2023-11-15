import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { getYear } from 'date-fns';

import { FhiWeekpickerComponent } from '../fhi-weekpicker/fhi-weekpicker.component';
import { FhiTimeConstants } from '../fhi-time-constants';
import { WeekRange } from './week-range.model';
import { FhiWeek } from '../fhi-weekpicker/fhi-week.model';

@Component({
  selector: 'fhi-week-range',
  standalone: true,
  templateUrl: './fhi-week-range.component.html',
  imports: [CommonModule, FhiWeekpickerComponent],
})
export class FhiWeekRangeComponent {
  @Input() labelWeekFrom = 'Fra uke';
  @Input() labelWeekTo = 'Til uke';
  @Input() maxWeek: FhiWeek = { year: getYear(new Date()) + 1, week: 52 };
  @Input() minWeek: FhiWeek = { year: 1900, week: 1 };
  @Input() weekFrom: FhiWeek;
  @Input() weekTo: FhiWeek;

  @Output() weekRangeSelect = new EventEmitter<WeekRange>();

  idFrom: string = 'from-week_' + Math.random().toString(36).substring(2, 20);
  idTo: string = 'to-week_' + Math.random().toString(36).substring(2, 20);

  maxWeekFrom: FhiWeek;
  maxWeekTo: FhiWeek;

  minWeekFrom: FhiWeek;
  minWeekTo: FhiWeek;

  selectedRange: WeekRange = {
    from: undefined,
    to: undefined,
  };
  isValid = true;

  ngOnInit() {
    this.maxWeekFrom = this.maxWeek;
    this.maxWeekTo = this.maxWeek;

    this.minWeekFrom = this.minWeek;
    this.minWeekTo = this.minWeek;

    if (this.weekFrom) {
      this.minWeekTo = this.weekFrom;
      this.selectedRange.from = this.weekFrom;
    }
    if (this.weekTo) {
      this.maxWeekFrom = this.weekTo;
      this.selectedRange.to = this.weekTo;
    }

    // TODO: validating input should only throw errors
    //       - it's something wrong in the system, the user hasn't done anyting wrong
    // if (this.weekFrom && this.weekTo) {
    //   this.checkWeekRangeValidity();
    // }
  }

  // TODO: change actions
  // ngOnChanges(changes: SimpleChanges) {
  // }

  onWeekFromSelect(yearWeek: FhiWeek) {
    this.weekFrom = yearWeek;
    this.minWeekTo = yearWeek;
    this.selectedRange.from = yearWeek;

    if (this.weekTo) {
      this.isValid = this.isValidWeekRange();
    }
    if (this.isValid && this.weekTo) {
      this.weekRangeSelect.emit(this.selectedRange);
    }
  }

  onWeekToSelect(yearWeek: FhiWeek) {
    this.weekTo = yearWeek;
    this.maxWeekFrom = yearWeek;
    this.selectedRange.to = yearWeek;

    if (this.weekFrom) {
      this.isValid = this.isValidWeekRange();
    }
    if (this.isValid && this.weekFrom) {
      this.weekRangeSelect.emit(this.selectedRange);
    }
  }

  private isValidWeekRange(): boolean {
    const yearWeekTo = this.getYearWeekAsNumber(this.weekTo);
    const yearWeekFrom = this.getYearWeekAsNumber(this.weekFrom);

    if (yearWeekTo - yearWeekFrom < 0) {
      return false;
    }
    return true;
  }

  private getYearWeekAsNumber(yearWeek: FhiWeek): number {
    let yearWeekAsNumber = 0;
    const year = yearWeek.year;
    const week = yearWeek.week;
    yearWeekAsNumber = year * 100 + week;
    return yearWeekAsNumber;
  }
}
