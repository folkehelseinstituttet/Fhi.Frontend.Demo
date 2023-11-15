import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FhiAutosuggestModule } from '../../fhi-autosuggest/fhi-autosuggest.module';
import { FhiAutosuggestItem } from '../../fhi-autosuggest/fhi-autosuggest.model';
import { FhiYearsComponent } from '../fhi-years/fhi-years.component';
import { FhiConstantsService } from '../../shared-services/fhi-constants.service';

@Component({
  selector: 'fhi-month-range',
  standalone: true,
  imports: [CommonModule, FhiAutosuggestModule, FhiYearsComponent],
  templateUrl: './fhi-month-range-copy.component.html',
  providers: [FhiConstantsService],
})
export class FhiMonthRangeCopyComponent {
  @Input() maxYear: number = this.FHI_CONSTANTS.MAX_YEAR;
  @Input() minYear: number = this.FHI_CONSTANTS.MIN_YEAR;

  @Output() monthRangeSelect = new EventEmitter<object>();

  fieldsetLegendFrom = 'Fra måned';
  fieldsetLegendTo = 'Til måned';
  labelMonth = 'måned';
  labelYear = 'år';
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
    { id: 12, name: 'Desember' },
  ];
  monthFrom: number;
  monthFromList: FhiAutosuggestItem[] = [...this.monthListFull];
  monthTo: number;
  monthToList: FhiAutosuggestItem[] = [...this.monthListFull];
  validRange = true;
  yearFrom: string;
  yearTo: string;

  constructor(private FHI_CONSTANTS: FhiConstantsService) {}

  ngOnInit() {
    this.maxYearFrom = this.maxYear;
    this.minYearTo = this.minYear;
  }

  onYearSelect(year: number[], context: string) {
    console.log('year', year);
    console.log('context', context);
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

  onMonthSelect(month: number[], context: string) {
    console.log('month', month);
    console.log('context', context);
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
    const fromMonth: any = new Date(Number(this.yearFrom), this.monthFrom - 1);
    const toMonth: any = new Date(Number(this.yearTo), this.monthTo, 0);

    if (toMonth - fromMonth >= 0) {
      this.monthRangeSelect.emit({
        start: {
          year: Number(this.yearFrom),
          month: this.monthFrom,
        },
        end: {
          year: Number(this.yearTo),
          month: this.monthTo,
        },
      });
      this.validRange = true;
    }
    if (toMonth - fromMonth < 0) {
      this.validRange = false;
    }

    if (
      this.yearFrom === this.yearTo &&
      this.yearFrom !== undefined &&
      this.yearTo !== undefined
    ) {
      this.adjustMonthList();
    } else {
      this.monthFromList = [...this.monthListFull];
      this.monthToList = [...this.monthListFull];
    }
  }

  private adjustMonthList() {
    if (this.monthFrom !== undefined) {
      this.monthToList = this.monthListFull.slice(this.monthFrom - 1);
    }
    if (this.monthTo !== undefined) {
      const offsetFrom = (12 - this.monthTo) * -1;
      if (offsetFrom < 0) {
        this.monthFromList = this.monthListFull.slice(0, offsetFrom);
      } else {
        this.monthFromList = [...this.monthListFull];
      }
    }
  }
}
