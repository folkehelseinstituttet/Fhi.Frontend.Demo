import { Component, Input, OnInit } from '@angular/core';
// import { faCalendarAlt } from '@fortawesome/pro-light-svg-icons';

import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ngb-datepicker-arrow',
  templateUrl: './ngb-datepicker-arrow.component.html'
})
export class NgbDatepickerArrowComponent implements OnInit {

  @Input() datepickerType: string;

  // faCalendarAlt = faCalendarAlt;
  minDate: NgbDateStruct = {
    year: 2020,
    month: 2,
    day: 21
  };
  maxDate: NgbDateStruct = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate()
  };
  navigation = 'arrow'; // Kun navn på gjeldende måned vise
  outsideDays = 'collapsed';

  ngOnInit() { }

}
