import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { getYear } from 'date-fns';

import { FhiWeekpickerComponent } from '../fhi-weekpicker/fhi-weekpicker.component';
import { FhiTimeConstants } from '../fhi-time-constants';
import { WeekRange } from './week-range.model';

@Component({
  selector: 'fhi-week-range',
  standalone: true,
  templateUrl: './fhi-week-range.component.html',
  imports: [ CommonModule, FhiWeekpickerComponent ],
})
export class FhiWeekRangeComponent {
  @Input() weekFrom: string;
  @Input() weekTo: string;
  @Input() labelWeekFrom: string = 'Fra uke';
  @Input() labelWeekTo: string = 'Til uke';
  @Input() maxWeek: string = getYear(new Date()) + 1 + '-52';
  @Input() minWeek: string = '1900-1';

  @Output() weekRangeSelect = new EventEmitter<WeekRange>();

  idFrom: string = 'from-week_' + Math.random().toString(36).substring(2, 20);
  idTo: string = 'to-week_' + Math.random().toString(36).substring(2, 20);

  maxWeekFrom: string;
  maxWeekTo: string;

  minWeekFrom: string;
  minWeekTo: string;

  selectedRange: WeekRange = {
    weekFrom: undefined,
    weekTo: undefined
  };
  isValid = true;

  ngOnInit() {
    this.maxWeekFrom = this.maxWeek;
    this.maxWeekTo = this.maxWeek;

    this.minWeekFrom = this.minWeek;
    this.minWeekTo = this.minWeek;

    if (this.weekFrom) {
      this.minWeekTo = this.weekFrom;
      this.selectedRange.weekFrom = this.weekFrom;
    }
    if (this.weekTo) {
      this.maxWeekFrom = this.weekTo;
      this.selectedRange.weekTo = this.weekTo;
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


  onWeekFromSelect(yearWeek: string) {
    this.weekFrom = yearWeek;
    this.minWeekTo = yearWeek;
    this.selectedRange.weekFrom = yearWeek;

    if (this.weekTo) {
      this.isValid =this.isValidWeekRange();
    }
    if (this.isValid && this.weekTo) {
      this.weekRangeSelect.emit(this.selectedRange);
    }
  }

  onWeekToSelect(yearWeek: string) {
    this.weekTo = yearWeek;
    this.maxWeekFrom = yearWeek;
    this.selectedRange.weekTo = yearWeek;

    if (this.weekFrom) {
      this.isValid =this.isValidWeekRange();
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

  private getYearWeekAsNumber(yearWeek: string): number {
    let yearWeekAsNumber: number;
    const parts = yearWeek.split(FhiTimeConstants.weekpickerDelimiter);
    const year = parseInt(parts[0], 10);
    const week = parseInt(parts[1], 10);
    yearWeekAsNumber = year * 100 + week;
    return yearWeekAsNumber;
  }
}
