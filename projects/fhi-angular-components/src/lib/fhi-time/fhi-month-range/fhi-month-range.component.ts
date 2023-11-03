import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { toNumber } from 'lodash-es';

import { FhiMonthSelectorComponent } from '../fhi-month-selector/fhi-month-selector.component';
import { FhiConstantsService } from '../../shared-services/fhi-constants.service';

@Component({
  selector: 'fhi-month-range',
  standalone: true,
  imports: [ CommonModule, FhiMonthSelectorComponent ],
  templateUrl: './fhi-month-range.component.html',
  providers: [ FhiConstantsService ]
})
export class FhiMonthRangeComponent {
  @Input() fieldsetLegendFrom: string = 'Fra';
  @Input() fieldsetLegendTo: string = 'Til';
  @Input() labelMonthFrom: string = 'måned';
  @Input() labelMonthTo: string = 'måned';
  @Input() labelYearFrom: string = 'år';
  @Input() labelYearTo: string = 'år';
  @Input() maxYear: number = this.FHI_CONSTANTS.MAX_YEAR;
  @Input() minYear: number = this.FHI_CONSTANTS.MIN_YEAR;

  maxYearFrom: number;
  minYearTo: number;

  constructor(private FHI_CONSTANTS: FhiConstantsService) {}

  ngOnInit() {
    this.maxYearFrom = this.maxYear;
    this.minYearTo = this.minYear;
  }

  onMonthFromSelect(event: any) {
    const dashPos = event.indexOf('-');
    this.minYearTo = toNumber(event.substring(0, dashPos));
  }

  onMonthToSelect(event: any) {
    const dashPos = event.indexOf('-');
    this.maxYearFrom = toNumber(event.substring(0, dashPos));
  }
}
