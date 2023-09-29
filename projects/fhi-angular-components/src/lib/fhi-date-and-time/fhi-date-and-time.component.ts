import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { FhiDatepickerComponent } from '../fhi-datepicker/fhi-datepicker.component';
import { format, formatISO, isValid, parseISO, toDate } from 'date-fns';
import nb from 'date-fns/locale/nb';
import { getTimezoneOffset } from 'date-fns-tz';

@Component({
  standalone: true,
  selector: 'fhi-date-and-time',
  templateUrl: './fhi-date-and-time.component.html',
  imports: [
    FhiDatepickerComponent,
    FormsModule
  ]
})
export class FhiDateAndTimeComponent {
  @Input() label?: string;
  @Input() initialTime?: string;

  @Output() dateAndTimeSelect = new EventEmitter<string>();

  thisTimeId: string = 'time_' + Math.random().toString(36).substring(2, 20);

  dateSelected: string;
  timeEntered: string;
  dateAndTimeSelected: string;

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
    const currentString = this.timeEntered;
    
    if (allowedKeys.indexOf(key) >= 0) {
      if (this.timeEntered.length <= 5) {
        if (key !== ":" && currentString.length === 2) {
          this.timeEntered = currentString + ':';
        }
        
        if (key === ":") {
          if (currentString.length === 1) {
            this.timeEntered = '';
          }
          if (currentString.length === 2) {
            this.timeEntered = '0' + this.timeEntered;
          }
          if (currentString.length > 3) {
            this.timeEntered = this.timeEntered.substring(0, 3);
          }
        }

        if (this.timeEntered.length === 5) {
          this.concatenateDateAndTime();
        }
      } else {
        this.timeEntered = this.timeEntered.replace(key, '');
      }
    } else {
      if (key.length === 1) {
        this.timeEntered = this.timeEntered.replace(key, '');
      }
    }
  }

  private concatenateDateAndTime() {
    this.dateAndTimeSelected = this.dateSelected + 'T' + this.timeEntered;
    const parsedISO = parseISO(this.dateAndTimeSelected);
    // console.log('RAW:', this.dateAndTimeSelected);
    // console.log('date:', parsedISO);

    if (isValid(parsedISO)) {
      const formattedISO = formatISO(parsedISO);
      // console.log('formatted ISO:', formattedISO);
      this.dateAndTimeSelect.emit(formattedISO);
    }
  }
}
