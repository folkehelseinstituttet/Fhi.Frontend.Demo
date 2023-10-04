import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbAlertModule, NgbDateParserFormatter, NgbDatepickerI18n, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { format, formatISO, isValid, toDate } from 'date-fns';

@Component({
  selector: 'fhi-week-selector',
  templateUrl: './fhi-week-selector.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgbDatepickerModule,
    NgbAlertModule
  ]
})
export class FhiWeekSelectorComponent {
  @Input() date?: string;
  @Input() label: string = 'Velg uke';
  @Input() maximumDate?: string;
  @Input() minimumDate?: string;

  @Output() weekSelect = new EventEmitter<string>();

  errorMsg: string = '';
  maxDate: NgbDateStruct;
  minDate: NgbDateStruct;
  model: NgbDateStruct;
  uniqueId: string = 'weekselector_' + Math.random().toString(36).substring(2, 20);
  week: string;
  weekIsValid: boolean = true;

  ngOnInit() {
    
  }

  onDirectInputWeek() {

  }

  onWeekSelection(date: any) {
    console.log(this.week);
  }
}
