import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

export class DatepickerConfig {
  static minDate: NgbDateStruct = {
    year: 1898,
    month: 1,
    day: 1
  };
  static maxDate: NgbDateStruct = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate()
  };
}
