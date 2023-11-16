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

import { FhiAutosuggestModule } from '../../fhi-autosuggest/fhi-autosuggest.module';
import { FhiAutosuggestItem } from '../../fhi-autosuggest/fhi-autosuggest.model';

import { FhiConstantsService } from '../../shared-services/fhi-constants.service';

@Component({
  selector: 'fhi-years',
  templateUrl: './fhi-years.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FhiAutosuggestModule],
  providers: [FhiConstantsService],
})
export class FhiYearsComponent implements OnInit, OnChanges {
  @Input() id = this.getRandomId();
  @Input() label = 'Velg år';
  @Input() maxYear: number = this.FHI_CONSTANTS.MAX_YEAR;
  @Input() minYear: number = this.FHI_CONSTANTS.MIN_YEAR;
  @Input() years: number[];

  @Output() yearsSelect = new EventEmitter<number[]>();

  year!: number;
  yearItems!: FhiAutosuggestItem[];

  constructor(private FHI_CONSTANTS: FhiConstantsService) {}

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

  onItemSelectChange(year: number) {
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
