import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct, NgbDatepickerI18n, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

import { FhiDatepickerI18nService } from '../fhi-datepicker-i18n.service';
import { WeekParserFormatterService } from './services/week-parser-formatter.service';
import { WeekAdapterService } from './services/week-adapter.service';
import { WeekValidationService } from './services/week-validator.service';
import { FhiTimeConstants } from '../fhi-time-constants';
import { WeekUtilityService } from './services/week-utility.service';

@Component({
  selector: 'fhi-weekpicker',
  templateUrl: './fhi-weekpicker.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, FormsModule, NgbDatepickerModule],
  providers: [
    WeekValidationService,
    WeekUtilityService,
    {
      provide: NgbDatepickerI18n,
      useClass: FhiDatepickerI18nService,
    },
    {
      provide: NgbDateParserFormatter,
      useClass: WeekParserFormatterService,
    },
    {
      provide: NgbDateAdapter,
      useClass: WeekAdapterService,
    },
  ],
})
export class FhiWeekpickerComponent {
  @Input() id: string;
  @Input() week: string;
  @Input() label: string = FhiTimeConstants.weekpickerLabel;
  @Input() maxWeek: string;
  @Input() minWeek: string;

  @Output() weekSelect = new EventEmitter<any>();

  minDate: NgbDateStruct;
  maxDate: NgbDateStruct;
  startDate!: NgbDateStruct;
  placeholder = FhiTimeConstants.weekpickerPlaceholder;
  invalidFeedbackText!: string;
  isValid = true;

  constructor(
    private weekValidationService: WeekValidationService,
    private weekUtilityService: WeekUtilityService
  ) { }

  ngOnInit() {
    this.maxWeekChangeActions();
    this.minWeekChangeActions();
    this.weekChangeActions();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.maxWeek && !changes.maxWeek.isFirstChange()) {
      this.maxWeekChangeActions();
    }
    if (changes.minWeek && !changes.minWeek.isFirstChange()) {
      this.minWeekChangeActions();
    }
    if (changes.week && !changes.week.isFirstChange()) {
      this.weekChangeActions();
    }
  }

  onDateSelect(date: NgbDateStruct) {
    const week = this.weekUtilityService.getYearWeekStringFromDate(date);
    this.startDate = date;
    this.isValid = true;
    this.weekSelect.emit(week);
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
    const week = this.weekValidationService.getUnvalidatedYearWeekString();
    const date = this.getValidDate(week);

    if (date !== undefined) {
      this.startDate = date;
      this.isValid = true;
      this.weekSelect.emit(week);
      return;
    }
    this.isValid = false;
    this.invalidFeedbackText = this.weekValidationService.getInvalidFeedbackText();
  }

  private weekChangeActions() {
    if (typeof this.week !== 'string') {
      this.week = '';
    }
    const date = this.getValidDate(this.week);

    if (date !== undefined) {
      this.startDate = date;
      return;
    }
    this.weekValidationService.throwInputValueError('week');
  }

  private getValidDate(week: string): NgbDateStruct | null | undefined {
    let date: NgbDateStruct;
    let isValid = false;

    if (this.weekValidationService.isValidYearWeekString(week)) {
      date = this.getDate();
      isValid = true;
    }
    if (isValid && date !== null) {
      isValid = this.weekValidationService.weekWithinMaxWeekAndMinWeek(date);
    }
    if (isValid) {
      return date;
    }
    return undefined;
  }

  private maxWeekChangeActions() {
    if (typeof this.maxWeek !== 'string') {
      this.maxDate = this.weekUtilityService.getMaxDate();
      return;
    }
    if (this.weekValidationService.isValidYearWeekString(this.maxWeek)) {
      this.maxDate = this.getDate();
      this.weekUtilityService.setMaxDate(this.maxDate);
      return;
    }
    this.weekValidationService.throwInputValueError('maxWeek');
  }

  private minWeekChangeActions() {
    if (typeof this.minWeek !== 'string') {
      this.minDate = this.weekUtilityService.getMinDate();
      return;
    }
    if (this.weekValidationService.isValidYearWeekString(this.minWeek)) {
      this.minDate = this.getDate();
      this.weekUtilityService.setMinDate(this.minDate);
      return;
    }
    this.weekValidationService.throwInputValueError('minWeek');
  }

  private getDate(): NgbDateStruct | null {
    return this.weekUtilityService.getDateAfterValidatinYearWeekString();
  }

}
