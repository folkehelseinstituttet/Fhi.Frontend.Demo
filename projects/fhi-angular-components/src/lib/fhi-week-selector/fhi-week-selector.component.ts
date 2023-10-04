import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbAlertModule, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { getWeek } from 'date-fns';

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
  }
}
