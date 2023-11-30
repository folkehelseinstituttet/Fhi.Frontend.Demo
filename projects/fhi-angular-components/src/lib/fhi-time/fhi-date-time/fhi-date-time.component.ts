import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FhiDatepickerComponent } from '../fhi-datepicker/fhi-datepicker.component';
import { FhiDateTime } from '../shared/models/fhi-date-time.model';
import { FhiDate } from '../shared/models/fhi-date.model';
import { toNumber } from 'lodash-es';
import { FhiTime } from '../shared/models/fhi-time.model';

@Component({
  standalone: true,
  selector: 'fhi-date-time',
  templateUrl: './fhi-date-time.component.html',
  imports: [CommonModule, FhiDatepickerComponent, FormsModule],
})
export class FhiDateTimeComponent implements OnInit {
  @Input() label = 'Velg dato og tidspunkt';
  @Input() dateTime: FhiDateTime;
  // @Input() minDateTime: FhiDateTime; // TODO
  // @Input() maxDateTime: FhiDateTime; // TODO

  @Output() dateTimeSelect = new EventEmitter<FhiDateTime>();

  date!: FhiDate;
  isValid = true;
  timeModel!: string;
  unvalidatedDate!: FhiDate;

  errorMsg: string;
  thisTimeId: string = 'time_' + Math.random().toString(36).substring(2, 20);

  ngOnInit() {
    if (this.dateTime) {
      this.setInitDate();
      this.setInitTime();
    }
  }

  onDateSelect(date: FhiDate) {
    this.unvalidatedDate = date;
    this.validateAndEmit();
  }

  onBlur() {
    this.validateAndEmit();
  }

  onEnter() {
    this.validateAndEmit();
  }

  onFocus() {
    if (!this.isValid) {
      this.isValid = true;
    }
  }

  onKeyup(event: KeyboardEvent) {
    this.addColon(event.key);
  }

  private validateAndEmit() {
    const validDateTime = this.getValidDateTime(this.unvalidatedDate);
    if (validDateTime !== undefined) {
      this.isValid = true;
      this.dateTimeSelect.emit(validDateTime);
      return;
    }
    this.isValid = false;
    this.errorMsg = this.getInvalidFeedbackText();
  }

  private getValidDateTime(date: FhiDate | undefined): FhiDateTime | undefined {
    if (date === undefined) {
      return;
    }
    if (!this.isValidDateString()) {
      return;
    }
    const time = this.getValidTime();
    if (!time) {
      return;
    }
    return {
      date: date,
      time: time,
    };
  }

  private getValidTime(): FhiTime | undefined {
    const parts = this.timeModel.split(':');
    const hour = toNumber(parts[0]);
    const minute = toNumber(parts[1]);
    if (isNaN(hour) || isNaN(minute)) {
      return;
    }
    if (hour > 23 || minute > 59) {
      return;
    }
    return { hour: hour, minute: minute };
  }

  private isValidDateString() {
    const timePattern = new RegExp('^[0-9][0-9][:][0-9][0-9]$');
    if (!timePattern.test(this.timeModel)) {
      return false;
    }
    return true;
  }

  private setInitDate() {
    this.date = this.dateTime.date;
    this.unvalidatedDate = this.dateTime.date;
  }

  private setInitTime() {
    let hour = this.dateTime.time.hour.toString();
    let minute = this.dateTime.time.minute.toString();
    hour = hour.length > 1 ? hour : hour.padStart(2, '0');
    minute = minute.length > 1 ? minute : minute.padStart(2, '0');
    this.timeModel = `${hour}:${minute}`;
  }

  private addColon(eventKey: string) {
    const keys = ['Backspace', 'Delete', ':'];
    if (
      !keys.find((key) => key === eventKey) &&
      !this.timeModel.includes(':') &&
      this.timeModel.length === 2
    ) {
      this.timeModel = this.timeModel + ':';
    }
  }

  private getInvalidFeedbackText(): string {
    return `Du har lagt inn et klokkeslett som er ugylidg, eller har feil format.
Korrekt format er <strong>tt:mm</strong>`;
  }
}
