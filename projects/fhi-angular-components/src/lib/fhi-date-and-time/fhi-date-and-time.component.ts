import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FhiDatepickerComponent } from '../fhi-datepicker/fhi-datepicker.component';
import { formatISO, isValid, parseISO, getTime } from 'date-fns';

@Component({
  standalone: true,
  selector: 'fhi-date-and-time',
  templateUrl: './fhi-date-and-time.component.html',
  imports: [
    CommonModule,
    FhiDatepickerComponent,
    FormsModule
  ]
})
export class FhiDateAndTimeComponent {
  @Input() date?: string;
  @Input() label?: string;
  @Input() initialTime?: string;

  @Output() dateAndTimeSelect = new EventEmitter<string>();

  thisTimeId: string = 'time_' + Math.random().toString(36).substring(2, 20);

  currentDateTimeString: string;
  dateSelected: string;
  dateAndTimeIsValid: boolean = true;
  dateAndTimeSelected: string;
  errorMsg: string;
  timeEntered: string;

  ngOnInit() {
    if (this.initialTime) {
      this.timeEntered = this.initialTime;
    }
  }

  onGetDate(date: string) {
    this.dateSelected = date;
    this.concatenateDateAndTime();
  }

  onTimeChange(event: any) {
    const key = event.key;
    const allowedKeys: string = '0,1,2,3,4,5,6,7,8,9,:';
    
    if (allowedKeys.indexOf(key) >= 0) {
      if (this.timeEntered.length <= 5) {
        this.currentDateTimeString = this.timeEntered;

        if (key !== ":" && this.timeEntered.length === 2) {
          this.timeEntered = this.timeEntered + ':';
        }
        
        if (key === ":") {
          if (this.timeEntered.length === 1) {
            this.timeEntered = '';
          }
          if (this.timeEntered.length === 2) {
            this.timeEntered = '0' + this.timeEntered;
          }
          if (this.timeEntered.length > 3) {
            this.timeEntered = this.timeEntered.substring(0, 3);
          }
        }
      } else {
        this.timeEntered = this.currentDateTimeString;
      }

      if (this.timeEntered.length === 5) {
        this.checkIfTimeIsValid();
        this.errorMsg = 'Ugyldig tid';
      }
    } else {
      if (key.length === 1) {
        this.timeEntered = this.timeEntered.replace(key, '');
      }
      if (key === 'Meta') {
        const timePattern = new RegExp('^[0-9][0-9][:][0-9][0-9]$');
        if (!timePattern.test(this.timeEntered)) {
          this.timeEntered = undefined;
        }
      }
    }
    if (this.timeEntered === '') {
      this.timeEntered = undefined;
      this.dateAndTimeIsValid = true;
    }
    this.concatenateDateAndTime();
  }

  private checkIfTimeIsValid() {
    function isValidDate(dateString: string) {
      return !isNaN(Date.parse(dateString));
    }
    const timeToCheck = this.dateSelected + 'T' + this.timeEntered;

    this.dateAndTimeIsValid = isValidDate(timeToCheck);
  }

  private concatenateDateAndTime() {
    this.dateAndTimeSelected = this.dateSelected + 'T' + this.timeEntered;
    const parsedISO = parseISO(this.dateAndTimeSelected);

    if (isValid(parsedISO)) {
      const formattedISO = formatISO(parsedISO).split('+')[0] + 'Z';
      this.dateAndTimeSelect.emit(formattedISO);
    } else {
      this.dateAndTimeSelect.emit(undefined);
    }
  }
}
