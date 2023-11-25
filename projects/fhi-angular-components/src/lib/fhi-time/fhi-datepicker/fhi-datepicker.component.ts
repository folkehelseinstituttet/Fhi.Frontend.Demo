import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
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
  NgbDateStruct,
  NgbDatepickerI18n,
  NgbDatepickerModule,
} from '@ng-bootstrap/ng-bootstrap';

import { FhiDate } from '../fhi-date.model';
import { FhiDatepickerI18nService } from '../fhi-datepicker-i18n.service';
import { DateAdapterService } from './services/date-adapter.service';
import { DateUtilityService } from './services/date-utility.service';
import { DateParserFormatterService } from './services/date-parser-formatter.service';
import { DateValidationService } from './services/date-validator.service';

@Component({
  selector: 'fhi-datepicker',
  templateUrl: './fhi-datepicker.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule, NgbDatepickerModule],
  providers: [
    DateUtilityService,
    DateValidationService,
    {
      provide: NgbDatepickerI18n,
      useClass: FhiDatepickerI18nService,
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
  @Input() id: string; // TODO: Add randomId = `id${Math.floor(Math.random() * Math.pow(10, 8))}`; to constants
  @Input() label = 'Velg dato'; // TODO: constants
  @Input() date: FhiDate;
  @Input() minDate: FhiDate;
  @Input() maxDate: FhiDate;

  @Output() dateSelect = new EventEmitter<FhiDate>();

  dateString!: string;
  invalidFeedback!: string;
  isValid = true;
  model!: string;
  startDate!: NgbDateStruct;
  placeholder = 'dd.mm.åååå'; // TODO: constants

  constructor(
    private dateAdapter: NgbDateAdapter<string>,
    private dateUtilityService: DateUtilityService,
    private dateValidationService: DateValidationService,
  ) {}

  ngOnInit() {
    // console.log('date', this.date);
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
    this.dateSelect.emit(this.dateUtilityService.convertNgbDateToFhiDate(date));
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
      this.dateSelect.emit(this.dateUtilityService.getFhiDate(dateString));
      this.isValid = true;
    }
    this.isValid = false;
    this.invalidFeedback = this.dateValidationService.getInvalidFeedbackText();
  }

  private dateChangeActions() {
    // console.log('dateChangeActions', this.date);
    // TODO: isValidDate() && notOutsideMaxOrMin()
    this.isValid = true;
    this.startDate = this.date;
    this.model = this.dateAdapter.toModel(this.date);
  }

  private maxDateChangeActions() {
    // console.log('maxDateChangeActions');
    // TODO: isValidDate()
  }

  private minDateChangeActions() {
    // console.log('minDateChangeActions');
    // TODO: isValidDate()
  }
}
