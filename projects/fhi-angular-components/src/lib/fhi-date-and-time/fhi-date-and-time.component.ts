import { Component, Input, SimpleChanges } from '@angular/core';
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

  onTimeChange() {
    console.log(this.timeSelect);
  }
}
