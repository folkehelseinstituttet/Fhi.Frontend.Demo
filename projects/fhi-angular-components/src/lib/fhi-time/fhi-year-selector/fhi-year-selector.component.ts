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
  selector: 'fhi-year-selector',
  templateUrl: './fhi-year-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FhiAutosuggestModule],
  providers: [FhiConstantsService],
})
export class FhiYearSelectorComponent implements OnInit, OnChanges {
  @Input() label = 'Velg år';
  @Input() maxYear: number = this.FHI_CONSTANTS.MAX_YEAR;
  @Input() minYear: number = this.FHI_CONSTANTS.MIN_YEAR;
  @Input() years: number[];

  @Output() yearSelect = new EventEmitter<number[]>();

  year!: number;
  yearItems!: FhiAutosuggestItem[];

  constructor(private FHI_CONSTANTS: FhiConstantsService) {}

  ngOnInit() {
    if (this.years?.length > 0) {
      this.year = this.years[0];
    }
    this.updateYearList();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.years && !changes.years.isFirstChange()) {
      this.year = this.years[0];
    }
    if (
      (changes.minYear && !changes.minYear.isFirstChange()) ||
      (changes.maxYear && !changes.maxYear.isFirstChange())
    ) {
      this.updateYearList();
    }
  }

  onItemSelectChange(year: number) {
    this.yearSelect.emit([year]);
  }

  private updateYearList() {
    this.yearItems = [];
    for (let i = this.minYear; i <= this.maxYear; i++) {
      this.yearItems.push({
        id: i,
        name: i.toString(),
      });
    }
  }
}
