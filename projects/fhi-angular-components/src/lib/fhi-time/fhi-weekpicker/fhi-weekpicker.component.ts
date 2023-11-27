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
  NgbDateAdapter,
  NgbDateParserFormatter,
  NgbDateStruct,
  NgbDatepickerI18n,
  NgbDatepickerModule,
} from '@ng-bootstrap/ng-bootstrap';

import { FhiWeek } from '../fhi-week.model';
import { FhiDatepickerI18nService } from '../fhi-datepicker-i18n.service';
import { FhiTimeConstants } from '../fhi-time-constants';
import { WeekParserFormatterService } from './services/week-parser-formatter.service';
import { WeekAdapterService } from './services/week-adapter.service';
import { WeekValidationService } from './services/week-validator.service';
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
export class FhiWeekpickerComponent implements OnInit, OnChanges {
  @Input() id: string; // TODO: Add randomId (globally)
  @Input() label: string = FhiTimeConstants.weekpickerLabel; // TODO: constants...
  @Input() minWeek: FhiWeek;
  @Input() maxWeek: FhiWeek;
  @Input() week: FhiWeek;

  @Output() weekSelect = new EventEmitter<FhiWeek>();

  invalidFeedbackText!: string;
  isValid = true;
  minDate: NgbDateStruct;
  maxDate: NgbDateStruct;
  minWeekString: string;
  maxWeekString: string;
  placeholder = FhiTimeConstants.weekpickerPlaceholder;
  startDate!: NgbDateStruct;
  weekString: string;

  constructor(
    private weekValidationService: WeekValidationService,
    private weekUtilityService: WeekUtilityService,
  ) {}

  ngOnInit() {
    // this.initMinMaxWeeks();
    this.weekChangeActions();
    this.minWeekChangeActions();
    this.maxWeekChangeActions();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.week && !changes.week.isFirstChange()) {
      this.weekChangeActions();
    }
    if (changes.minWeek && !changes.minWeek.isFirstChange()) {
      this.minWeekChangeActions();
    }
    if (changes.maxWeek && !changes.maxWeek.isFirstChange()) {
      this.maxWeekChangeActions();
    }
  }

  onDateSelect(date: NgbDateStruct) {
    const jsDate = new Date(date.year, date.month - 1, date.day);
    this.isValid = true;
    this.startDate = date;
    this.weekSelect.emit(this.weekUtilityService.getYearWeek(jsDate));
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
      this.isValid = true;
    } else {
      this.isValid = false;
    }
    if (this.isValid && date !== null) {
      const jsDate = new Date(date.year, date.month - 1, date.day);
      this.startDate = date;
      this.weekSelect.emit(this.weekUtilityService.getYearWeek(jsDate));
      return;
    }
    this.invalidFeedbackText = this.weekValidationService.getInvalidFeedbackText();
  }

  private weekChangeActions() {
    if (typeof this.weekString !== 'string') {
      this.weekString = '';
    }
    const date = this.getValidDate(this.weekString);

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
      isValid = this.weekValidationService.isWeekWithinMaxWeekAndMinWeek(date);
    }
    if (isValid) {
      return date;
    }
    return undefined;
  }

  private initMinMaxWeeks() {
    if (this.week) {
      this.weekString = this.week.year + FhiTimeConstants.weekpickerDelimiter + this.week.week;
    }
    if (this.minWeek) {
      this.minWeekString =
        this.minWeek.year + FhiTimeConstants.weekpickerDelimiter + this.minWeek.week;
    }
    if (this.maxWeek) {
      this.maxWeekString =
        this.maxWeek.year + FhiTimeConstants.weekpickerDelimiter + this.maxWeek.week;
    }
  }

  private minWeekChangeActions() {
    console.log('minWeekChangeActions', this.minWeek);

    if (this.minWeek === undefined) {
      // this.minWeek = this.weekUtilityService.getMaxWeek(this.maxDate);
      return;
    }

    this.minWeekString =
      this.minWeek.year + FhiTimeConstants.weekpickerDelimiter + this.minWeek.week;
    if (this.weekValidationService.isValidYearWeekString(this.minWeekString)) {
      this.minDate = this.getDate();
      this.weekUtilityService.setMinDate(this.minDate);
      return;
    }
    this.weekValidationService.throwInputValueError('minWeek');
  }

  private maxWeekChangeActions() {
    // console.log('maxWeekChangeActions', this.maxWeek);

    if (this.maxWeek === undefined) {
      // this.minWeek = this.weekUtilityService.getMaxWeek(this.maxDate);
      return;
    }

    this.maxWeekString =
      this.maxWeek.year + FhiTimeConstants.weekpickerDelimiter + this.maxWeek.week;
    if (this.weekValidationService.isValidYearWeekString(this.maxWeekString)) {
      this.maxDate = this.getDate();
      this.weekUtilityService.setMaxDate(this.maxDate);
      return;
    }
    this.weekValidationService.throwInputValueError('maxWeek');
  }

  private getDate(): NgbDateStruct | null {
    return this.weekUtilityService.getDateAfterValidatinYearWeekString();
  }
}
