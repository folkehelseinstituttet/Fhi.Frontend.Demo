import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  @Output() monthRangeSelect = new EventEmitter<Object>();

  maxYearFrom: number;
  minYearTo: number;
  monthFrom: string;
  monthTo: string;
  validRange: boolean = true;

  constructor(private FHI_CONSTANTS: FhiConstantsService) {}

  ngOnInit() {
    this.maxYearFrom = this.maxYear;
    this.minYearTo = this.minYear;
  }

  onMonthFromSelect(event: any) {
    this.monthFrom = event;
    const dashPos = event.indexOf('-');
    this.minYearTo = toNumber(event.substring(0, dashPos));
    this.checkValidity();
  }

  onMonthToSelect(event: any) {
    this.monthTo = event;
    const dashPos = event.indexOf('-');
    this.maxYearFrom = toNumber(event.substring(0, dashPos));
    this.checkValidity();
  }

  private checkValidity() {
    const fromMonth: any = new Date(this.monthFrom);
    const toMonth: any = new Date(this.monthTo);
    
    if (toMonth - fromMonth >= 0) {
      this.monthRangeSelect.emit({
        fromYearMonth: this.monthFrom,
        toYearMonth: this.monthTo
      });
      this.validRange = true;
    }
    if (toMonth - fromMonth < 0) {
      this.validRange = false;
    }
  }
}
