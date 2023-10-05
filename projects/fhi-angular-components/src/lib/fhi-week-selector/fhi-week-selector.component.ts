import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbDatepickerI18n, NgbAlertModule, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { getWeek } from 'date-fns';

import { CustomDatepickerI18n } from '../shared-services/datepicker-i18n.service';

@Component({
  selector: 'fhi-week-selector',
  templateUrl: './fhi-week-selector.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgbDatepickerModule,
    NgbAlertModule
  ],
  providers: [
    { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }
	],
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

  onDirectInputWeek() {

  }

  onWeekSelection(date: any) {
    this.getWeekOnDate(date);
  }
  
  private getWeekOnDate(date: any) {
    const week = getWeek(new Date(date.year, date.month - 1, date.day), {
      weekStartsOn: 1,
      firstWeekContainsDate: 4
    });
    this.week = date.year + ' - ' + week;
    this.weekSelect.emit(date.year + '-W' + week);
  }
}
