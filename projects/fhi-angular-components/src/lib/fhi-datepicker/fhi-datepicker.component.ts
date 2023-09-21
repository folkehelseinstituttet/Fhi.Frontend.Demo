import { Component, EventEmitter, Inject, Injectable, Input, Output, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbAlertModule, NgbDateParserFormatter, NgbDatepickerI18n, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { format, formatISO, isValid, toDate } from 'date-fns';

const I18N_VALUES = {
	nb: {
		weekdays: ['ma', 'ti', 'on', 'to', 'fr', 'lø', 'sø'],
    months: ['jan', 'feb', 'mar', 'apr', 'mai', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'des'],
    weekLabel: 'uke'
	},
};

@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {
	constructor(
    @Inject(LOCALE_ID)
    private locale: string
  ) {
		super();
	}

	getWeekdayLabel(weekday: number): string {
		return I18N_VALUES[this.locale].weekdays[weekday - 1];
	}
	getWeekLabel(): string {
		return I18N_VALUES[this.locale].weekLabel;
	}
	getMonthShortName(month: number): string {
		return I18N_VALUES[this.locale].months[month - 1];
	}
	getMonthFullName(month: number): string {
		return this.getMonthShortName(month);
	}
	getDayAriaLabel(date: NgbDateStruct): string {
		return `${date.day}.${date.month}.${date.year}`;
	}
}


@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
  readonly DELIMITER = '.';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10),
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date
      ? format(new Date(date.year, date.month - 1, date.day), 'dd.MM.yyyy')
      : '';
  }
}

@Component({
  selector: 'fhi-datepicker',
  templateUrl: './fhi-datepicker.component.html',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    NgbDatepickerModule,
    NgbAlertModule
  ],
  providers: [
		{ provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
    { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }
	],
})
export class FhiDatepickerComponent {
  @Input() date?: string;
  @Input() maximumDate?: string;
  @Input() minimumDate?: string;
  @Input() label?: string = 'Velg dato';

  @Output() dateSelected = new EventEmitter<string>();

  dateIsValid: boolean = true;
  errorMsg: string = '';
  maxDate: NgbDateStruct;
  maxDateFormatted: Date;
  minDate: NgbDateStruct;
  minDateFormatted: Date;
  model: NgbDateStruct;
  uniqueId: string = 'datepickerId_' + Math.random().toString(36).substring(2, 20);

  ngOnInit() {
    this.model = this.convertDateToNgbDateStruct(this.date);
    this.maxDate = this.convertDateToNgbDateStruct(this.maximumDate);
    this.minDate = this.convertDateToNgbDateStruct(this.minimumDate);
    this.maxDateFormatted = new Date(this.maximumDate);
    this.minDateFormatted = new Date(this.minimumDate);
  }

  onDirectInputDate() {
    if (this.model) {
      const directInputDate: any = this.convertModelToDate(this.model);
      
      if (isValid(directInputDate)) {
        this.dateIsValid = true;
        const isInsideMinMaxRange = this.checkIfInsideRange(directInputDate);
        if (isInsideMinMaxRange) {
          this.model = this.convertDateToNgbDateStruct(formatISO(directInputDate, { representation: 'date' }));
          this.onDateSelection(this.model);
        } else {
          this.dateIsValid = false;
          this.errorMsg = 'Du har valgt en dato som er utenfor tillatt datoområde.';
        }
      } else {
        this.errorMsg = 'Du har lagt inn et datoformat som ikke støttes. Korrekt format er <strong>dd.mm.åååå</strong>';
        this.dateIsValid = false;
      }
    }
  }

  onDateSelection(date: any) {
    date = this.convertModelToDate(date);
    if (isValid(date)) {
      const isoDate = formatISO(date, { representation: 'date' });
      this.dateIsValid = true;
      this.dateSelected.emit(isoDate);
    } else {
      this.dateIsValid = false;
      this.errorMsg = 'Det er lagt inn et datoformat som ikke støttes.';
    }
  }

  private checkIfInsideRange(inputDate: any) {
    inputDate = new Date(inputDate);
    if (inputDate < this.minDateFormatted || inputDate > this.maxDateFormatted) {
      return false;
    }
    return true;
  }

  private convertModelToDate(model: any) {
    let leadingZero = '';
    if (model.month < 10) {
      leadingZero = '0';
    }
    const dateISOString = model.year + '-' + leadingZero + model.month + '-' + model.day;
    const date = toDate(new Date(dateISOString));
    return date;
  }

  private convertDateToNgbDateStruct(date: string) {
    const toDate = new Date(date);
    return {
      year  : toDate.getFullYear(),
      month : toDate.getMonth() + 1,
      day   : toDate.getDate()
    }
  }
}
