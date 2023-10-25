import { Component, Input } from '@angular/core';

import { FhiYearSelectorComponent } from '../../fhi-year-selector/fhi-year-selector.component';

@Component({
  selector: 'fhi-year-range',
  standalone: true,
  templateUrl: './fhi-year-range.component.html',
  imports: [ FhiYearSelectorComponent ]
})
export class FhiYearRangeComponent {
  @Input() labelFromYear: string = 'Fra år';
  @Input() labelToYear: string = 'Til år';
}
