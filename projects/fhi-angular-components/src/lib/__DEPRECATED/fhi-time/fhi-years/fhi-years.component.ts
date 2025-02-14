import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

import { FhiAutosuggestComponent } from '../../fhi-autosuggest/fhi-autosuggest.component';
import { FhiAutosuggestItem } from '../../fhi-autosuggest/fhi-autosuggest.model';

import { TimeConstants } from '../shared/time.constants';
import { FhiTimeUtilityService } from '../shared/fhi-time-utility.service';

@Component({
    selector: 'fhi-years',
    templateUrl: './fhi-years.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FhiAutosuggestComponent],
    providers: [FhiTimeUtilityService]
})
export class FhiYearsComponent implements OnInit, OnChanges {
  @Input() label = 'Velg år';
  @Input() minYear = TimeConstants.minYear;
  @Input() maxYear = TimeConstants.maxYear;
  @Input() years: number[];

  @Output() yearsSelect = new EventEmitter<number[]>();

  id!: string;
  year!: number;
  yearItems!: FhiAutosuggestItem[];

  constructor(private timeUtilityService: FhiTimeUtilityService) {
    this.id = this.timeUtilityService.getRandomID();
  }

  ngOnInit() {
    if (this.years?.length > 0) {
      this.year = this.years[0];
    }
    this.updateYearItems();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.years && !changes.years.isFirstChange()) {
      this.year = this.years[0];
    }
    if (
      (changes.minYear && !changes.minYear.isFirstChange()) ||
      (changes.maxYear && !changes.maxYear.isFirstChange())
    ) {
      this.updateYearItems();
    }
  }

  onSelectedItemChange(year: number) {
    this.yearsSelect.emit([year]);
  }

  private updateYearItems() {
    if (!this.minYear || !this.maxYear) {
      return;
    }
    this.yearItems = [];
    for (let i = this.minYear; i <= this.maxYear; i++) {
      this.yearItems.push({
        id: i,
        name: i.toString(),
      });
    }
  }

  private getRandomId() {
    return `id${Math.floor(Math.random() * Math.pow(10, 8))}`;
  }
}
