import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  NgbDateAdapter,
  NgbDateParserFormatter,
  NgbDateStruct,
  NgbDatepickerI18n,
  NgbDatepickerModule,
} from '@ng-bootstrap/ng-bootstrap';

import { FhiDatepickerI18nService } from '../fhi-datepicker-i18n.service';
import { WeekParserFormatterService } from './services/week-parser-formatter.service';
import { WeekAdapterService } from './services/week-adapter.service';
import { WeekValidationService } from './services/week-validator.service';
import { FhiTimeConstants } from '../fhi-time-constants';
import { FhiWeek } from './fhi-week.model';
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
  @Input() week: FhiWeek;
  @Input() label: string = FhiTimeConstants.weekpickerLabel;
  @Input() maxWeek: FhiWeek;
  @Input() minWeek: FhiWeek;

  @Output() weekSelect = new EventEmitter<any>();

  minDate: NgbDateStruct;
  maxDate: NgbDateStruct;
  startDate!: NgbDateStruct;
  placeholder = FhiTimeConstants.weekpickerPlaceholder;
  invalidFeedbackText!: string;
  isValid = true;

  constructor(
    private weekValidationService: WeekValidationService,
    private weekUtilityService: WeekUtilityService,
  ) {}

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
    const week = this.weekValidationService.getUnvalidatedFhiWeek();
    const date = this.getValidDate({ year: 2020, week: 10 });

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
    if (typeof this.week !== 'object') {
      this.week = undefined;
    }
    const date = this.getValidDate(this.week);

    if (date !== undefined) {
      this.startDate = date;
      return;
    }
    this.weekValidationService.throwInputValueError('week');
  }

  private getValidDate(week: FhiWeek): NgbDateStruct | null | undefined {
    let date: NgbDateStruct;
    let isValid = false;

    if (this.weekValidationService.isValidFhiWeek(week)) {
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

  private maxWeekChangeActions() {
    if (typeof this.maxWeek !== 'string') {
      this.maxDate = this.weekUtilityService.getMaxDate();
      return;
    }
    if (this.weekValidationService.isValidFhiWeek(this.maxWeek)) {
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
    if (this.weekValidationService.isValidFhiWeek(this.minWeek)) {
      this.minDate = this.getDate();
      this.weekUtilityService.setMinDate(this.minDate);
      return;
    }
    this.weekValidationService.throwInputValueError('minWeek');
  }

  private getDate(): NgbDateStruct | null {
    return this.weekUtilityService.getDateAfterValidatingYearWeekString();
  }
}
