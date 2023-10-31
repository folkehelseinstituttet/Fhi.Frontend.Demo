import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, SimpleChanges } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import {
  NgbDateAdapter,
  NgbDateParserFormatter,
  NgbDateStruct,
  NgbDatepickerI18n,
  NgbDatepickerModule,
} from "@ng-bootstrap/ng-bootstrap";

import { FhiDatepickerI18nService } from "../fhi-datepicker-i18n.service";
import { WeekParserFormatterService } from "./services/week-parser-formatter.service";
import { WeekAdapterService } from "./services/week-adapter.service";
import { WeekValidationContext, WeekValidatorService } from "./services/week-validator.service";
import { FhiTimeConstants } from "../fhi-time-constants";
import { WeekUtilityService } from "./services/week-utility.service";

@Component({
  selector: "fhi-weekpicker",
  templateUrl: "./fhi-weekpicker.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, FormsModule, NgbDatepickerModule],
  providers: [
    WeekValidatorService,
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
  @Input() week: string | null;
  @Input() label: string = FhiTimeConstants.weekpickerLabel;
  @Input() maxWeek: string;
  @Input() minWeek: string;

  @Output() weekSelect = new EventEmitter<any>();

  minDate: NgbDateStruct;
  maxDate: NgbDateStruct;
  startDate!: NgbDateStruct;
  placeholder = FhiTimeConstants.weekpickerPlaceholder;
  errorMsg!: string;
  isValid = true;

  constructor(
    private weekValidatorService: WeekValidatorService,
    private weekUtilityService: WeekUtilityService
  ) { }

  ngOnInit() {
    this.maxWeekChangeActions();
    this.minWeekChangeActions();
    this.weekChangeActions();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.weekValidatorService.setValidationContext(WeekValidationContext.weekpickerNgOnChanges);

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
    this.isValid = true;
    this.setStartDateAndEmit(week);
  }

  onBlur() {
    this.validateAndEmit();
  }

  onEnter() {
    this.validateAndEmit();
  }

  private validateAndEmit() {
    if (this.weekValidatorService.isValid) {
      this.isValid = true;
      this.setStartDateAndEmit(
        this.weekValidatorService.getValidYearWeekString()
      );
      return;
    }
    this.errorMsg = this.weekValidatorService.errorMsg;
    this.isValid = false;
  }

  private setStartDateAndEmit(week: string) {
    this.weekValidatorService.setValidationContext(WeekValidationContext.weekpickerSetStartDateAndEmit);
    this.startDate = this.weekUtilityService.getDateFromYearWeekString(week);
    this.weekSelect.emit(week);
  }

  private weekChangeActions() {
    if (this.week === undefined) {
      this.week = null;
    }
    if (!this.weekValidatorService.weekIsRequired) {
      return;
    }
    const date = this.weekUtilityService.getDateFromYearWeekString(this.week);
    if (date !== null) {
      this.startDate = date;
    }
  }

  private maxWeekChangeActions() {
    if (this.maxWeek === undefined) {
      this.maxDate = this.weekUtilityService.getMaxDate();
      return;
    }
    const date = this.weekUtilityService.getDateFromYearWeekString(this.maxWeek);
    if (date !== null) {
      this.maxDate = date;
      this.weekUtilityService.setMaxDate(date);
    }
  }

  private minWeekChangeActions() {
    if (this.minWeek === undefined) {
      this.minDate = this.weekUtilityService.getMinDate();
      return;
    }
    const date = this.weekUtilityService.getDateFromYearWeekString(this.minWeek);
    if (date !== null) {
      this.minDate = date;
      this.weekUtilityService.setMinDate(date);
    }
  }
}
