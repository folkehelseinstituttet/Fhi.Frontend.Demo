import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FhiMonthSelectorComponent } from '../fhi-month-selector/fhi-month-selector.component';

@Component({
  selector: 'fhi-month-range',
  standalone: true,
  imports: [ CommonModule, FhiMonthSelectorComponent ],
  templateUrl: './fhi-month-range.component.html'
})
export class FhiMonthRangeComponent {

}
