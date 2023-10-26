import { Component, Input } from '@angular/core';

import { FhiYearSelectorComponent } from '../../fhi-year-selector/fhi-year-selector.component';
import { FhiAutosuggestItem } from '../../fhi-autosuggest/fhi-autosuggest.model';

import { getYear } from 'date-fns';
import { toNumber } from 'lodash-es';

@Component({
  selector: 'fhi-year-range',
  standalone: true,
  templateUrl: './fhi-year-range.component.html',
  imports: [ FhiYearSelectorComponent ]
})
export class FhiYearRangeComponent {
  @Input() labelFromYear: string = 'Fra år';
  @Input() labelToYear: string = 'Til år';
  @Input() maxYear: number = getYear(new Date()) + 10;
  @Input() minYear: number = 1900;
  
  fromYearList: FhiAutosuggestItem[] = [];
  toYearList: FhiAutosuggestItem[] = [];

  onFromYearSelect(event: string) {
    this.minYear = toNumber(event);
  }

  onToYearSelect(event: string) {
    this.maxYear = toNumber(event);
  }
}
