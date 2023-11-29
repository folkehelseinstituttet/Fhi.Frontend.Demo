import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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

import {
  NgbCalendar,
  NgbCalendarGregorian,
  NgbDate,
  NgbDateAdapter,
  NgbDateParserFormatter,
  NgbDatepickerI18n,
  NgbDatepickerModule,
} from '@ng-bootstrap/ng-bootstrap';

import { FhiDate } from '../shared/models/fhi-date.model';
import { LocalValues } from '../shared/i18n/local-values.model';
import { I18nService } from '../shared/i18n/i18n.service';
import { DatepickerI18nService } from '../shared/i18n/datepicker-i18n.service';
import { DateAdapterService } from './services/date-adapter.service';
import { DateParserFormatterService } from './services/date-parser-formatter.service';
import { DateUtilityService } from './services/date-utility.service';
import { DateValidationService } from './services/date-validation.service';

@Component({
  selector: 'fhi-datepicker',
  templateUrl: './fhi-datepicker.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FormsModule, CommonModule, NgbDatepickerModule],
  providers: [
    I18nService,
    DateUtilityService,
    DateValidationService,
    {
      provide: NgbDatepickerI18n,
      useClass: DatepickerI18nService,
    },
    {
      provide: NgbDateAdapter,
      useClass: DateAdapterService,
    },
    {
      provide: NgbDateParserFormatter,
      useClass: DateParserFormatterService,
    },
    { provide: NgbCalendar, useClass: NgbCalendarGregorian },
  ],
})
export class FhiDatepickerComponent implements OnInit, OnChanges {
  private i18n: LocalValues;

  @Input() id: string; // TODO: Add randomId = `id${Math.floor(Math.random() * Math.pow(10, 8))}`; to constants
  @Input() label: string;
  @Input() date: FhiDate;
  @Input() minDate: FhiDate;
  @Input() maxDate: FhiDate;

  @Output() dateSelect = new EventEmitter<FhiDate>();

  invalidFeedback!: string;
  isValid = true;
  model!: string;
  startDate!: FhiDate;
  placeholder: string;
  datepickerOpen: string;

  constructor(
    private i18nService: I18nService,
    private dateAdapter: NgbDateAdapter<string>,
    private dateUtilityService: DateUtilityService,
    private dateValidationService: DateValidationService,
  ) {
    this.i18n = this.i18nService.getI18nValues();
    this.datepickerOpen = this.i18n.datepickerOpen;
  }

  ngOnInit() {
    this.placeholder = this.i18n.dateFormatPlaceholder;
    this.labelChangeActions();
    this.dateChangeActions();
    this.minDateChangeActions();
    this.maxDateChangeActions();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.date && !changes.date.isFirstChange()) {
      this.dateChangeActions();
    }
    if (changes.minDate && !changes.minDate.isFirstChange()) {
      this.minDateChangeActions();
    }
    if (changes.maxDate && !changes.maxDate.isFirstChange()) {
      this.maxDateChangeActions();
    }
  }

  onDateSelect(date: NgbDate) {
    this.isValid = true;
    this.startDate = date;
    this.dateSelect.emit(this.dateUtilityService.getFhiDateFromNgbDate(date));
  }

  onBlur() {
    this.validateAndEmit();
  }

  onEnter() {
    this.validateAndEmit();
  }

  onFocus() {
    if (!this.isValid) {
      this.isValid = true;
    }
  }

  private validateAndEmit() {
    const dateString = this.dateValidationService.getUnvalidatedDateString();
    const isValid = this.dateValidationService.isValidDateString(dateString);
    if (isValid) {
      const date = this.dateUtilityService.getFhiDateFromValidDateString(dateString);
      this.isValid = true;
      this.startDate = date;
      this.dateSelect.emit(date);
      return;
    }
    this.isValid = false;
    this.invalidFeedback = this.dateValidationService.getInvalidFeedbackText();
  }

  private dateChangeActions() {
    if (this.date === undefined || this.dateValidationService.isValidDate(this.date)) {
      this.model = this.dateAdapter.toModel(this.date);
      this.startDate = this.date;
      this.isValid = true;
      return;
    }
    this.dateValidationService.throwInputValueError('date');
  }

  private minDateChangeActions() {
    if (this.minDate === undefined) {
      this.minDate = this.dateUtilityService.getDefaultMinDate();
      this.dateUtilityService.setMinDate(this.minDate);
      return;
    }
    if (this.dateValidationService.isValidDate(this.minDate)) {
      this.dateUtilityService.setMinDate(this.minDate);
      return;
    }
    this.dateValidationService.throwInputValueError('minDate');
  }

  private maxDateChangeActions() {
    if (this.maxDate === undefined) {
      this.maxDate = this.dateUtilityService.getDefaultMaxDate();
      this.dateUtilityService.setMaxDate(this.maxDate);
      return;
    }
    if (this.dateValidationService.isValidDate(this.maxDate)) {
      this.dateUtilityService.setMaxDate(this.maxDate);
      return;
    }
    this.dateValidationService.throwInputValueError('maxDate');
  }

  private labelChangeActions() {
    this.label = this.label ? this.label : this.i18n.dateFormLabel;
  }
}
