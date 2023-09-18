import { Component, EventEmitter, Injectable, Input, Output } from '@angular/core';
import { formatDate, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbAlertModule, NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

// @Injectable()
// export class CustomDateParserFormatter extends NgbDateParserFormatter {
//   readonly DELIMITER = '.';

//   parse(value: string): NgbDateStruct | null {
//     if (value) {
//       const date = value.split(this.DELIMITER);
//       return {
//         day: parseInt(date[0], 10),
//         month: parseInt(date[1], 10),
//         year: parseInt(date[2], 10),
//       };
//     }
//     return null;
//   }

//   format(date: NgbDateStruct | null): string {
//     return date
//       ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year
//       : '';
//   }
// }

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
  // providers: [
  //   { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
  // ],
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
    this.model = this.convertDateToDateStruct(this.date);
    this.maxDate = this.convertDateToDateStruct(this.maxDate);
    this.minDate = this.convertDateToDateStruct(this.minDate);
  }

  updateDate(hoi: any) {
    console.log(hoi.target.value);
  }

  dateSelection(date: any) {
    const currentLocalTime = new Date();
    date = new Date(date.year,
                    date.month - 1,
                    date.day,
                    currentLocalTime.getHours(),
                    currentLocalTime.getMinutes(),
                    currentLocalTime.getSeconds()
                  );
    const isoDate = date.toISOString();
    this.dateSelected.emit(isoDate);
  }

  private convertDateToDateStruct(date: string) {
    const toDate = new Date(date);
    return {
      year  : toDate.getFullYear(),
      month : toDate.getMonth() + 1,
      day   : toDate.getDate()
    }
  }
}
