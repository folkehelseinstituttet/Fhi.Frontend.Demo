import { Component, Input } from '@angular/core';

import { FhiYearSelectorComponent } from '../../fhi-year-selector/fhi-year-selector.component';
import { FhiAutosuggestItem } from '../../fhi-autosuggest/fhi-autosuggest.model';

import { FhiConstantsService } from '../../shared-services/fhi-constants.service';

import { toNumber } from 'lodash-es';

@Component({
  selector: 'fhi-year-range',
  standalone: true,
  templateUrl: './fhi-year-range.component.html',
  imports: [ FhiYearSelectorComponent ],
  providers: [ FhiConstantsService ]
})
export class FhiYearRangeComponent {
  @Input() labelFromYear: string = 'Fra år';
  @Input() labelToYear: string = 'Til år';
  @Input() maxYear: number = this.FHI_CONSTANTS.MAX_YEAR;
  @Input() minYear: number = this.FHI_CONSTANTS.MIN_YEAR;
  
  fromYearList: FhiAutosuggestItem[] = [];
  toYearList: FhiAutosuggestItem[] = [];

  constructor(private FHI_CONSTANTS: FhiConstantsService) {}

  onFromYearSelect(event: string) {
    this.minYear = toNumber(event);
  }

  onToYearSelect(event: string) {
    this.maxYear = toNumber(event);
  }
}
