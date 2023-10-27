import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FhiDatepickerComponent } from '../../fhi-datepicker/fhi-datepicker.component';

@Component({
  selector: 'fhi-date-range',
  standalone: true,
  imports: [ CommonModule, FhiDatepickerComponent ],
  templateUrl: './fhi-date-range.component.html',
})
export class FhiDateRangeComponent {
  @Input() labelDateFrom: string = 'Fra dato';
  @Input() labelDateTo: string = 'Til dato';
}
