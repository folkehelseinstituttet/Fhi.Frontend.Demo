import { Component, Injectable, Input } from '@angular/core';
import { NgbDateParserFormatter, NgbDatepicker, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

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
      ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year
      : '';
  }
}

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',

  providers: [
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
  ],
})
export class DatepickerExampleComponent {

  @Input() itemId!: string;
  @Input() itemIds!: any;

  datePickerActive: boolean = false;
  justClosed: boolean = false;

  toggleDatePicker(datepicker: any) {
    datepicker.toggle();

    if (this.justClosed) {
      this.justClosed = false;
    } else {
      this.datePickerActive = true;
    }
  }

  closingDatepicker() {
    this.datePickerActive = false;
    this.justClosed = true;

    setTimeout(() => {// if closed NOT by toggler
      this.justClosed = false;
    }, 50);
  }

}
