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
  NgbDate,
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
  model!: FhiWeek;
  minDate: NgbDateStruct;
  maxDate: NgbDateStruct;
  startDate!: NgbDateStruct;

  // TODO: same solution for placeholders in all components...
  placeholder = FhiTimeConstants.weekpickerPlaceholder;

  constructor(
    private weekAdapter: NgbDateAdapter<FhiWeek>,
    private weekValidationService: WeekValidationService,
    private weekUtilityService: WeekUtilityService,
  ) {}

  ngOnInit() {
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

  onDateSelect(date: NgbDate) {
    this.isValid = true;
    this.startDate = date;
    this.weekSelect.emit(this.weekUtilityService.getWeekFromNgbDate(date));
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
    const weekString = this.weekValidationService.getUnvalidatedYearWeekString();
    const isValid = this.weekValidationService.isValidYearWeekString(weekString);
    if (isValid) {
      this.weekSelect.emit(this.weekUtilityService.getWeekFromValidWeekString(weekString));
      this.isValid = true;
      return;
    }
    this.isValid = false;
    this.invalidFeedbackText = this.weekValidationService.getInvalidFeedbackText();
  }

  private weekChangeActions() {
    let date: NgbDateStruct;
    let isValid = true;
    if (this.week === undefined) {
      date = null;
    } else if (this.weekValidationService.isValidWeek(this.week)) {
      date = this.weekUtilityService.getDateFromWeek(this.week);
    } else {
      isValid = false;
    }
    if (isValid) {
      this.model = this.weekAdapter.toModel(date);
      this.startDate = date;
      this.isValid = true;
      return;
    }
    this.weekValidationService.throwInputValueError('week');
  }

  private minWeekChangeActions() {
    let isValid = true;
    if (this.minWeek === undefined) {
      this.minWeek = this.weekUtilityService.getMinWeek();
    } else if (this.weekValidationService.isValidWeek(this.minWeek)) {
      this.weekUtilityService.setMinDate(this.minDate);
    } else {
      isValid = false;
    }
    if (isValid) {
      this.minDate = this.weekUtilityService.getDateFromWeek(this.minWeek);
      return;
    }
    this.weekValidationService.throwInputValueError('minWeek');
  }

  private maxWeekChangeActions() {
    let isValid = true;
    if (this.maxWeek === undefined) {
      this.maxWeek = this.weekUtilityService.getMaxWeek();
    } else if (this.weekValidationService.isValidWeek(this.maxWeek)) {
      this.weekUtilityService.setMaxDate(this.maxDate);
    } else {
      isValid = false;
    }
    if (isValid) {
      this.maxDate = this.weekUtilityService.getDateFromWeek(this.maxWeek);
      return;
    }
    this.weekValidationService.throwInputValueError('maxWeek');
  }
}
