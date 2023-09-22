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
  @Input() label: string;

  thisTime: string = 'time_' + Math.random().toString(36).substring(2, 20);
  timeSelect: string = '11:52';
}
