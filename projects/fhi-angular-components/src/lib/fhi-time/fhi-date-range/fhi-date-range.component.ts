import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FhiDatepickerComponent } from '../../fhi-datepicker/fhi-datepicker.component';

@Component({
  selector: 'fhi-date-range',
  standalone: true,
  imports: [CommonModule, FhiDatepickerComponent],
  templateUrl: './fhi-date-range.component.html',
})
export class FhiDateRangeComponent {
  @Input() dateFrom: string;
  @Input() dateTo: string;
  @Input() labelDateFrom = 'Fra dato';
  @Input() labelDateTo = 'Til dato';
  @Input() maximumDate: string;
  @Input() minimumDate: string;

  @Output() dateRangeSelect = new EventEmitter<any>();

  validRange = true;
  errorMsg: string;
  fromDate: any;
  toDate: any;
  maxDate: any;
  minDate: any;
  invalidRangeCssClass: string;
  latestChangedRangeEnd: string;

  ngOnInit() {
    if (this.minimumDate) {
      this.minDate = this.minimumDate;
    }
    if (this.maximumDate) {
      this.maxDate = this.maximumDate;
    }
  }

  dateFromSelect(dateFrom: string) {
    if (dateFrom) {
      this.minDate = dateFrom;
      this.fromDate = dateFrom;
      this.checkIfValidRange('from');
    }
  }

  dateToSelect(dateTo: string) {
    if (dateTo) {
      this.maxDate = dateTo;
      this.toDate = dateTo;
      this.checkIfValidRange('to');
    }
  }

  private checkIfValidRange(rangeEnd: string) {
    if (this.fromDate && this.toDate) {
      const from: any = new Date(this.fromDate);
      const to: any = new Date(this.toDate);
      const range = to - from;

      if (range < 0) {
        this.validRange = false;
        this.errorMsg =
          '<strong>' +
          this.labelDateFrom +
          '</strong> må være før eller samtidig som <strong>' +
          this.labelDateTo +
          '</strong>';
        this.latestChangedRangeEnd = rangeEnd;
      } else {
        this.validRange = true;
        this.errorMsg = '';
        this.dateRangeSelect.emit({
          fromDate: this.fromDate,
          toDate: this.toDate,
        });
      }
    }
  }
}
