import { Component, Input } from '@angular/core';

import { FhiDatepickerComponent } from '../fhi-datepicker/fhi-datepicker.component';

@Component({
  standalone: true,
  selector: 'fhi-date-and-time',
  templateUrl: './fhi-date-and-time.component.html',
  imports: [
    FhiDatepickerComponent
  ]
})
export class FhiDateAndTimeComponent {
  @Input() label: string;
}
