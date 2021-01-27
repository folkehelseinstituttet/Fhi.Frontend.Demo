import { Component, Input, OnInit } from '@angular/core';
import { faCalendarAlt } from '@fortawesome/pro-light-svg-icons';

import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ngb-datepicker-select',
  templateUrl: './ngb-datepicker-select.component.html'
})
export class NgbDatepickerSelectComponent implements OnInit {

  @Input() datepickerType: string;

  faCalendarAlt = faCalendarAlt;
  minDate: NgbDateStruct = {
    year: 1950,
    month: 1,
    day: 1
  };
  maxDate: NgbDateStruct = {
    year: 2025,
    month: 1,
    day: 1
  };
  navigation = 'select'; // Måned-/år-dropdown vises
  outsideDays = 'collapsed';

  ngOnInit() { }

}
