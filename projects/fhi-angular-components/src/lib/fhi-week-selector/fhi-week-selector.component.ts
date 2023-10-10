import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbDatepickerI18n, NgbAlertModule, NgbDate, NgbDateParserFormatter, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { getWeek } from 'date-fns';

import { CustomDatepickerI18n } from '../shared-services/datepicker-i18n.service';
import { FhiWeekParserFormatter } from './fhi-week-parser-formatter';

export class WeekSelectValue {
  year: number;
  week: number;
}

@Component({
  selector: 'fhi-week-selector',
  templateUrl: './fhi-week-selector.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgbDatepickerModule,
    NgbAlertModule
  ],
  providers: [
    { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n },
    { provide: NgbDateParserFormatter, useClass: FhiWeekParserFormatter }
	],
})
export class FhiWeekSelectorComponent {
  @Input() date?: string;
  @Input() label: string = 'Velg uke';
  @Input() maximumDate?: string;
  @Input() minimumDate?: string;

  @Output() weekSelect = new EventEmitter<WeekSelectValue>();

  errorMsg: string = '';
  fromDate: NgbDate;
  toDate: NgbDate;
  now = new Date();
  maxDate: NgbDateStruct = { year: this.now.getFullYear() + 10, month: this.now.getMonth() + 1, day: this.now.getDay() };
  minDate: NgbDateStruct = { year: 1900, month: 1, day: 1 };
  uniqueId: string = 'weekselector_' + Math.random().toString(36).substring(2, 20);
  selectedWeek: any;
  weekEntered: string;
  weekIsValid: boolean = true;
  
  onChange: (_: any) => void;
  onTouched: any;

  set weekPickerValue(value: WeekSelectValue) {
    this.onChange(value);
    this.weekSelect.emit(value);
  }

  selectedDateChange(value: WeekSelectValue | string | null | any) {
    if (!value) {
      this.onWeekSelection(null);
    } else {
      if (typeof value === 'string') {
        // Return invalid weekPickerValue validateWeek(): ValidatorFn will return error
        if (this.onChange) {
          this.weekPickerValue = {
            year: -1,
            week: -1
          };
        }
      } else {
        this.onWeekSelection(value);
      }
    }
  }

  onWeekSelection(date: NgbDate | null) {
    let fromDate: Date | null = null;

    if (date) {
      fromDate = new Date(Date.UTC(date.year, date.month - 1, date.day));
      let time = fromDate.getDay() ? fromDate.getDay() - 1 : 6;
      fromDate = new Date(fromDate.getTime() - time * 24 * 60 * 60 * 1000);
      this.fromDate = new NgbDate(
        fromDate.getUTCFullYear(),
        fromDate.getMonth() + 1,
        fromDate.getDate()
      );
      const toDate = new Date(fromDate.getTime() + 6 * 24 * 60 * 60 * 1000);
      this.toDate = new NgbDate(
        toDate.getUTCFullYear(),
        toDate.getMonth() + 1,
        toDate.getDate()
      );
    } else {
      this.selectedWeek = ''; // Fix for "Tøm filtre()"
      this.fromDate = null;
      this.toDate = null;
    }
    if (this.onTouched) this.onTouched();
    if (this.onChange) {
      if (fromDate) {
        this.weekPickerValue = FhiWeekSelectorComponent.getYearWeekValue(fromDate);
      } else {
        this.weekPickerValue = null;
      }
    }
  }

  static getYearWeekValue(date: Date): WeekSelectValue {
    const week = getWeek(new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())), {
      weekStartsOn: 1,
      firstWeekContainsDate: 4
    });
    return { year: date.getFullYear(), week: week };
  }

  static calculateDate(week: number, year: number): NgbDate | null {
    if (week<1 || week>53 || year < 1900) return null;

    const firstDay = new Date(year + "-1-4");
    const date = new Date(
      firstDay.getTime() + (week - 1) * 7 * 24 * 60 * 60 * 1000
    );

    return new NgbDate(
      date.getUTCFullYear(),
      date.getMonth() + 1,
      date.getDate()
    )
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
