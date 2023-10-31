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
import { WeekValidatorService } from "./services/week-validator.service";
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
  @Input() week: string | null = null;
  @Input() label: string = FhiTimeConstants.weekpickerLabel;
  @Input() maxWeek: string;
  @Input() minWeek: string;

  @Output() weekSelect = new EventEmitter<any>();

  minDate: NgbDateStruct;
  maxDate: NgbDateStruct;
  startDate!: NgbDateStruct;
  placeholder = FhiTimeConstants.weekpickerPlaceholder;
  errorMsg!: string;
  isValid!: boolean;

  constructor(
    private weekValidatorService: WeekValidatorService,
    private weekUtilityService: WeekUtilityService
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.week) {
      this.weekChangeActions();
    }
    if (changes.maxWeek) {
      this.maxWeekChangeActions();
    }
    if (changes.minWeek) {
      this.minWeekChangeActions();
    }
  }

  private maxWeekChangeActions() {
    this.maxDate = this.weekUtilityService.getDateFromYearWeekString(this.maxWeek);
    this.weekUtilityService.updateMaxYear(this.maxDate);
  }

  private minWeekChangeActions() {
    this.minDate = this.weekUtilityService.getDateFromYearWeekString(this.minWeek);
    this.weekUtilityService.updateMinYear(this.minDate);
  }

  onDateSelect(date: NgbDateStruct) {
    const week = this.weekUtilityService.getYearWeekStringFromDate(date);
    this.isValid = true;
    this.weekValidatorService.isValid = true;
    this.weekValidatorService.validYearWeekString = week;
    this.weekSelect.emit(week);
  }

  onInput() {
    if (this.weekValidatorService.isValid) {
      this.isValid = true;
    } else {
      this.errorMsg = this.weekValidatorService.errorMsg;
      this.isValid = false;
    }
  }

  onBlur() {
    this.emitValidYearWeekString();
  }

  onEnter() {
    this.emitValidYearWeekString();
  }

  private emitValidYearWeekString() {
    const week = this.weekValidatorService.validYearWeekString;
    if (this.weekValidatorService.isValid) {
      this.startDate = this.weekUtilityService.getDateFromYearWeekString(week);
      this.weekSelect.emit(this.weekUtilityService.getYearWeekStringFromDate(this.startDate));
    }
  }

  private weekChangeActions() {
    const date = this.weekUtilityService.getDateFromYearWeekString(this.week);
    if (this.week !== null && date === null) {
      this.weekValidatorService.setErrorMsg(this.week);
      this.errorMsg = this.weekValidatorService.errorMsg;
      this.isValid = false;
    } else {
      this.startDate = date;
      this.week = this.weekUtilityService.getYearWeekStringFromDate(date);
      this.isValid = true;
    }
  }
}
