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

import { FhiAutosuggestModule } from '../fhi-autosuggest/fhi-autosuggest.module';
import { FhiAutosuggestItem } from '../fhi-autosuggest/fhi-autosuggest.model';

import { FhiConstantsService } from '../shared-services/fhi-constants.service';

@Component({
  selector: 'fhi-year-selector',
  templateUrl: './fhi-year-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FhiAutosuggestModule],
  providers: [FhiConstantsService],
})
export class FhiYearSelectorComponent implements OnInit, OnChanges {
  @Input() label = 'År';
  @Input() maxYear: number = this.FHI_CONSTANTS.MAX_YEAR;
  @Input() minYear: number = this.FHI_CONSTANTS.MIN_YEAR;
  @Input() year: number;

  @Output() yearSelect = new EventEmitter<Array<number>>();

  yearList: FhiAutosuggestItem[] = [];

  constructor(private FHI_CONSTANTS: FhiConstantsService) {}

  ngOnInit() {
    this.updateYearList();
  }

  ngOnChanges(changes: SimpleChanges) {
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
    this.yearList = [];
    for (let i = this.minYear; i <= this.maxYear; i++) {
      this.yearList.push({
        id: i,
        name: i.toString(),
      });
    }
  }
}
