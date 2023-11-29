import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FhiWeekpickerComponent } from '../fhi-weekpicker/fhi-weekpicker.component';
import { FhiWeekRange } from './fhi-week-range.model';
import { FhiWeek } from '../shared/models/fhi-week.model';
import { LocalValues } from '../shared/i18n/local-values.model';
import { I18nService } from '../shared/i18n/i18n.service';

import { TimeConstants } from '../shared/time.constants';

@Component({
  selector: 'fhi-week-range',
  standalone: true,
  templateUrl: './fhi-week-range.component.html',
  imports: [CommonModule, FhiWeekpickerComponent],
})
export class FhiWeekRangeComponent implements OnInit {
  private i18n: LocalValues;

  @Input() maxWeek: FhiWeek = TimeConstants.maxWeek;
  @Input() minWeek: FhiWeek = TimeConstants.minWeek;

  @Output() weekRangeSelect = new EventEmitter<FhiWeekRange>();

  idFrom: string = 'from-week_' + Math.random().toString(36).substring(2, 20);
  idTo: string = 'to-week_' + Math.random().toString(36).substring(2, 20);

  labelWeekFrom: string;
  labelWeekTo: string;

  maxWeekFrom: FhiWeek;
  minWeekTo: FhiWeek;

  weekFrom: FhiWeek;
  weekTo: FhiWeek;

  selectedRange: FhiWeekRange = {
    from: undefined,
    to: undefined,
  };
  isValid = true;

  constructor(private i18nService: I18nService) {
    this.i18n = this.i18nService.getI18nValues();
    this.labelWeekFrom = this.i18n.weekRangeLabelFrom;
    this.labelWeekTo = this.i18n.weekRangeLabelTo;
  }

  ngOnInit() {
    this.initMinMaxWeeks();

    // TODO: validating input should only throw errors
    //       - it's something wrong in the system, the user hasn't done anyting wrong
    // if (this.weekFrom && this.weekTo) {
    //   this.checkWeekRangeValidity();
    // }
  }

  // TODO: change actions
  // ngOnChanges(changes: SimpleChanges) {
  // }

  onWeekSelectFrom(yearWeek: FhiWeek) {
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

  onWeekSelectTo(yearWeek: FhiWeek) {
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

  private initMinMaxWeeks() {
    this.maxWeekFrom = this.maxWeek;
    this.minWeekTo = this.minWeek;

    if (this.weekFrom) {
      this.minWeekTo = this.weekFrom;
      this.selectedRange.from = this.weekFrom;
    }
    if (this.weekTo) {
      this.maxWeekFrom = this.weekTo;
      this.selectedRange.to = this.weekTo;
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
