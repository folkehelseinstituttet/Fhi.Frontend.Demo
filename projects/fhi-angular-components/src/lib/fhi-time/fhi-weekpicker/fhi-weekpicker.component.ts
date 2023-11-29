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

import { FhiWeek } from '../shared/models/public/fhi-week.model';
import { DatepickerI18nService } from '../shared/i18n/datepicker-i18n.service';
import { FhiTimeConstants } from '../fhi-time-constants';
import { WeekParserFormatterService } from './services/week-parser-formatter.service';
import { WeekAdapterService } from './services/week-adapter.service';
import { WeekValidationService } from './services/week-validation.service';
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
      useClass: DatepickerI18nService,
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

  invalidFeedback!: string;
  isValid = true;
  model!: FhiWeek;
  minDate: NgbDateStruct;
  maxDate: NgbDateStruct;

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

  onDateSelect() {
    this.isValid = true;
    this.weekSelect.emit(this.model);
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
    const weekString = this.weekValidationService.getUnvalidatedWeekString();
    const isValid = this.weekValidationService.isValidWeekString(weekString);
    if (isValid) {
      this.isValid = true;
      this.model = this.weekUtilityService.getWeekFromValidWeekString(weekString);
      this.weekSelect.emit(this.model);
      return;
    }
    this.isValid = false;
    this.invalidFeedback = this.weekValidationService.getInvalidFeedbackText();
  }

  private weekChangeActions() {
    if (this.week === undefined || this.weekValidationService.isValidWeek(this.week)) {
      this.isValid = true;
      this.model = this.weekAdapter.toModel(this.weekUtilityService.getDateFromWeek(this.week));
      return;
    }
    this.weekValidationService.throwInputValueError('week');
  }

  private minWeekChangeActions() {
    if (this.minWeek === undefined) {
      this.minDate = this.weekUtilityService.getDefaultMinDate();
      this.weekUtilityService.setMinDate(this.minDate);
      return;
    }
    if (this.weekValidationService.isValidWeek(this.minWeek)) {
      this.minDate = this.weekUtilityService.getDateFromWeek(this.minWeek);
      this.weekUtilityService.setMinDate(this.minDate);
      return;
    }
    this.weekValidationService.throwInputValueError('minWeek');
  }

  private maxWeekChangeActions() {
    if (this.maxWeek === undefined) {
      this.maxDate = this.weekUtilityService.getDefaultMaxDate();
      this.weekUtilityService.setMaxDate(this.maxDate);
      return;
    }
    if (this.weekValidationService.isValidWeek(this.maxWeek)) {
      this.maxDate = this.weekUtilityService.getDateFromWeek(this.maxWeek);
      this.weekUtilityService.setMaxDate(this.maxDate);
      return;
    }
    this.weekValidationService.throwInputValueError('maxWeek');
  }
}
