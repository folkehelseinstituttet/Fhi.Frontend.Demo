import { AfterViewInit, Component, EventEmitter, forwardRef, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

import { NgbDatepickerI18n, NgbAlertModule, NgbDate, NgbDateAdapter, NgbDateParserFormatter, NgbDatepickerModule, NgbDateStruct, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { getWeek } from 'date-fns';

import { FhiCustomDatepickerI18n } from '../shared-services/fhi-datepicker-i18n.service';
import { FhiWeekParserFormatter } from './fhi-week-parser-formatter';
import { FhiCustomAdapter } from "./fhi-week-selector-adapter";
import { FhiWeekSelectorValue } from './fhi-week-selector-value.model';

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
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FhiWeekSelectorComponent),
      multi: true
    },
    { 
      provide: NgbDatepickerI18n,
      useClass: FhiCustomDatepickerI18n
    },
    { 
      provide: NgbDateParserFormatter,
      useClass: FhiWeekParserFormatter
    },
    {
      provide: NgbDateAdapter,
      useClass: FhiCustomAdapter
    }     
	],
})
export class FhiWeekSelectorComponent implements ControlValueAccessor, AfterViewInit {
  @ViewChild('datePicker', { static: false }) datePicker: NgbInputDatepicker;
  @Input() date?: string;
  @Input() label: string = 'Velg uke';
  @Input() maximumDate?: string;
  @Input() minimumDate?: string;

  @Output() weekSelect = new EventEmitter<FhiWeekSelectorValue>();

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

  ngAfterViewInit() {
    if (this.fromDate) {
      setTimeout(() => {
        this.datePicker.navigateTo(this.fromDate);
      });
    }
  }

  set weekSelectorValue(value: FhiWeekSelectorValue) {
    console.log('w e e k S e l e c t o r V a l u e :', value);
    this.onChange(value);
    this.weekSelect.emit(value);
  }

  toggle() {
    this.datePicker?.toggle();
  }

  isOpen() {
    return this.datePicker?.isOpen() ?? false;
  }

  selectedDateChange(value: FhiWeekSelectorValue | string | null | any) {
    if (!value) {
      this.onWeekSelection(null);
    } else {
      if (typeof value === 'string') {
        // Return invalid weekSelectorValue validateWeek(): ValidatorFn will return error
        if (this.onChange) {
          this.weekSelectorValue = {
            year: -1,
            week: -1
          };
        }
      } else {
        let date = FhiWeekSelectorComponent.calculateDate(value.week, value.year);
        this.onWeekSelection(date);
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
      console.log('onChange', fromDate);
      if (fromDate) {
        this.weekSelectorValue = FhiWeekSelectorComponent.getYearWeekValue(fromDate);
      } else {
        this.weekSelectorValue = null;
      }
    }
  }

  static getYearWeekValue(date: Date): FhiWeekSelectorValue {
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

  writeValue(value: FhiWeekSelectorValue | null): void {
    let selectDate: NgbDate | null = null;
    if (value) {
      if (this.datePicker) this.datePicker.manualDateChange(`${value.year}-${value.week}`, true);
      selectDate = FhiWeekSelectorComponent.calculateDate(value.week, value.year);
    } else {
      if (this.datePicker) this.datePicker.manualDateChange('', true);
    }
    this.onWeekSelection(selectDate);
  }
}
