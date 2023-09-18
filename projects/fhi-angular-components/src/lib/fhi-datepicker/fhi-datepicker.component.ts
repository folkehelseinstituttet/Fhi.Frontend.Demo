import { Component, Injectable, Input } from '@angular/core';
import { formatDate, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbCalendar, NgbAlertModule, NgbDateParserFormatter, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FhiDatepickerDate } from './fhi-datepicker.model';

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
  @Input() date: FhiDatepickerDate;
  @Input() outsideDays: string;
  @Input() maxDate: NgbDateStruct;
  @Input() minDate: NgbDateStruct;

  model: NgbDateStruct;
  uniqueId: string = 'datepickerId_' + Math.random().toString(36).substring(2, 20);

  ngOnInit() {
    if (this.date) {
      this.model = this.date;
    }
  }
}
