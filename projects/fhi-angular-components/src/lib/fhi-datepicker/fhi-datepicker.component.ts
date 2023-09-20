import { Component, EventEmitter, Injectable, Input, Output } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbAlertModule, NgbDateAdapter, NgbDateParserFormatter, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { format, formatISO, isValid, parseISO, toDate } from 'date-fns';
import { nb } from 'date-fns/locale';

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
      ? format(new Date(date.year, date.month - 1, date.day), 'dd.MM.yyyy', { locale: nb })
      : '';
  }
}

@Component({
  selector: 'fhi-datepicker',
  templateUrl: './fhi-datepicker.component.html',
  standalone: true,
  imports: [
    FormsModule,
    JsonPipe,
    CommonModule,
    NgbDatepickerModule,
    NgbAlertModule
  ],
  providers: [
		{ provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
	],
})
export class FhiDatepickerComponent {
  @Input() date?: string;
  @Input() maximumDate?: string;
  @Input() minimumDate?: string;

  @Output() dateSelected = new EventEmitter<string>();

  dateIsValid: boolean = true;
  errorMsg: string = '';
  maxDateFormatted: Date;
  maxDate: NgbDateStruct;
  minDateFormatted: Date;
  minDate: NgbDateStruct;
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
    console.log(inputDate);
    console.log(this.minDateFormatted);
    console.log(this.maxDateFormatted);
    console.log('- - -');
    if (inputDate < this.minDateFormatted || inputDate > this.maxDateFormatted) {
      return false;
    }
    return true;
  }

  private convertModelToDate(model: any) {
    const date = toDate(new Date(model.year, model.month - 1, model.day));
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
