import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { isValid } from 'date-fns';

import { FhiAutosuggestModule } from '../../fhi-autosuggest/fhi-autosuggest.module';
import { FhiAutosuggestItem } from '../../fhi-autosuggest/fhi-autosuggest.model';
import { FhiYearSelectorComponent } from '../../fhi-year-selector/fhi-year-selector.component';
import { FhiConstantsService } from '../../shared-services/fhi-constants.service';

@Component({
  selector: 'fhi-month-range',
  standalone: true,
  imports: [
    CommonModule,
    FhiAutosuggestModule,
    FhiYearSelectorComponent
  ],
  templateUrl: './fhi-month-range.component.html',
  providers: [ FhiConstantsService ]
})
export class FhiMonthRangeComponent {
  @Input() maxYear: number = this.FHI_CONSTANTS.MAX_YEAR;
  @Input() minYear: number = this.FHI_CONSTANTS.MIN_YEAR;
  
  @Output() monthRangeSelect = new EventEmitter<Object>();
  
  fieldsetLegendFrom: string = 'Fra måned';
  fieldsetLegendTo: string = 'Til måned';
  labelMonthFrom: string = 'måned';
  labelMonthTo: string = 'måned';
  labelYearFrom: string = 'år';
  labelYearTo: string = 'år';
  maxYearFrom: number;
  minYearTo: number;
  monthListFull: FhiAutosuggestItem[] = [
    { id: 1, name: 'Januar' },
    { id: 2, name: 'Februar' },
    { id: 3, name: 'Mars' },
    { id: 4, name: 'April' },
    { id: 5, name: 'Mai' },
    { id: 6, name: 'Juni' },
    { id: 7, name: 'Juli' },
    { id: 8, name: 'August' },
    { id: 9, name: 'September' },
    { id: 10, name: 'Oktober' },
    { id: 11, name: 'November' },
    { id: 12, name: 'Desember'}
  ];
  monthList: FhiAutosuggestItem[] = this.monthListFull;
  monthFrom: number;
  monthTo: number;
  validRange: boolean = true;
  yearFrom: string;
  yearTo: string;

  constructor(private FHI_CONSTANTS: FhiConstantsService) {}

  ngOnInit() {
    this.maxYearFrom = this.maxYear;
    this.minYearTo = this.minYear;
  }

  onYearFromSelect(event: any) {
    this.yearFrom = event;
    this.minYearTo = event;
    this.checkValidity();
  }

  onYearToSelect(event: any) {
    this.yearTo = event;
    this.maxYearFrom = event;
    this.checkValidity();
  }

  onMonthFromSelect(event: any) {
    this.monthFrom = event;
    this.checkValidity();
  }

  onMonthToSelect(event: any) {
    this.monthTo = event;
    this.checkValidity();
  }

  private checkValidity() {
    const fromMonth: any = new Date(Number(this.yearFrom), this.monthFrom -1);
    const toMonth: any = new Date(Number(this.yearTo), this.monthTo, 0);
    
    if (toMonth - fromMonth >= 0) {
      this.monthRangeSelect.emit({
        start: {
          year: Number(this.yearFrom),
          month: this.monthFrom
        },
        end: {
          year: Number(this.yearTo),
          month: this.monthTo
        }
      });
      this.validRange = true;
    }
    if (toMonth - fromMonth < 0) {
      this.validRange = false;
    }
  }
}
