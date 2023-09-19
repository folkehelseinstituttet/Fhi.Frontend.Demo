import { Component, EventEmitter, Injectable, Input, Output } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbAlertModule, NgbDateAdapter, NgbDateParserFormatter, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { format, formatISO, parseISO, toDate } from 'date-fns';
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
    NgbDatepickerModule,
    NgbAlertModule,
    FormsModule,
    JsonPipe
  ],
  providers: [
		{ provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
	],
})
export class FhiDatepickerComponent {
  @Input() date?: Date | any;
  @Input() maxDate?: NgbDateStruct | any;
  @Input() minDate?: NgbDateStruct | any;
  @Input() outsideDays?: string;

  @Output() dateSelected = new EventEmitter<string>();

  model: NgbDateStruct;
  uniqueId: string = 'datepickerId_' + Math.random().toString(36).substring(2, 20);

  ngOnInit() {
    this.model = this.convertDateToNgbDateStruct(this.date);
    this.maxDate = this.convertDateToNgbDateStruct(this.maxDate);
    this.minDate = this.convertDateToNgbDateStruct(this.minDate);
  }

  onDirectInputDate() {
    const directInputDate: any = this.convertModelToDate(this.model);
    this.model = this.convertDateToNgbDateStruct(formatISO(directInputDate, { representation: 'date' }));
    this.onDateSelection(this.model);
  }

  onDateSelection(date: any) {
    const currentLocalTime = new Date();
    date = this.convertModelToDate(date);
    const isoDate = formatISO(date, { representation: 'date' });
    
    this.dateSelected.emit(isoDate);
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
