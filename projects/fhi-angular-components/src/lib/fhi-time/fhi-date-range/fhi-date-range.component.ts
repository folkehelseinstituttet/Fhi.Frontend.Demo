import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FhiDatepickerComponent } from '@folkehelseinstituttet/angular-components';

@Component({
  selector: 'fhi-date-range',
  standalone: true,
  imports: [ CommonModule, FhiDatepickerComponent ],
  templateUrl: './fhi-date-range.component.html',
})
export class FhiDateRangeComponent {

}
