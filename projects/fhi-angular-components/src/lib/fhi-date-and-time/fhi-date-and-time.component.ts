import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { FhiDatepickerComponent } from '../fhi-datepicker/fhi-datepicker.component';

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

  thisTime: string = 'time_' + Math.random().toString(36).substring(2, 20);
  timeSelect: string;

  ngOnInit() {
    if (this.initialTime) {
      this.timeSelect = this.initialTime;
    }
  }

  onTimeChange(event: any) {
    const key = event.key;
    const allowedKeys: string = '0,1,2,3,4,5,6,7,8,9,:';
    const currentString = this.timeSelect;
    
    if (allowedKeys.indexOf(key) !== -1) {
      if (key !== ":" && currentString.length === 2) {
        this.timeSelect = currentString + ':';
      }
      
      if (key === ":" && currentString.length === 2) {
        this.timeSelect = '0' + this.timeSelect;
      }
    } else {
      console.log(key, this.timeSelect);
      this.timeSelect.split(key).pop();
    }
  }
}
