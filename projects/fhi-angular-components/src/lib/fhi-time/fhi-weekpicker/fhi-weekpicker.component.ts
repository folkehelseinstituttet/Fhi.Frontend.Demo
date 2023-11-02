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
    this.validateAndEmit(date);
  }

  onBlur() {
    this.validateAndEmit();
  }

  onEnter() {
    this.validateAndEmit();
  }

  private validateAndEmit(date?: NgbDateStruct) {
    let week: string;

    if (date) {
      week = this.weekUtilityService.getYearWeekStringFromDate(date);
      this.isValid = true;
    } else {
      week = this.weekValidatorService.getUnvalidatedYearWeekString();
      this.isValid = this.weekValidatorService.validateYearWeekString(week);
    }

    if (!this.isValid) {
      this.errorMsg = this.weekValidatorService.errorMsg;
      return;
    }

    this.startDate = this.weekUtilityService.getDateFromYearWeekString(week);
    this.weekSelect.emit(week);

    // TODO: when all works again: look at select, blur, enter and change 
    //                             and see if more code can be reused!
  }

  private weekChangeActions() {
    if (this.week === undefined) {
      this.week = null;
    }
    const date = this.weekUtilityService.getDateFromYearWeekString(this.week);

    if (date !== null) {
      this.startDate = date;
      this.weekValidatorService.setValidYearWeekString(this.week);
    } else {
      this.weekValidatorService.throwInputValueError('week');
    }
  }

  private maxWeekChangeActions() {
    if (this.maxWeek === undefined) {
      this.maxDate = this.weekUtilityService.getMaxDate();
      return;
    }
    const date = this.weekUtilityService.getMinDateOrMaxDateFromYearWeekString(this.maxWeek);

    if (date !== null) {
      this.maxDate = date;
      this.weekUtilityService.setMaxDate(date);
    } else {
      this.weekValidatorService.throwInputValueError('maxWeek');
    }
  }

  private minWeekChangeActions() {
    if (this.minWeek === undefined) {
      this.minDate = this.weekUtilityService.getMinDate();
      return;
    }
    const date = this.weekUtilityService.getMinDateOrMaxDateFromYearWeekString(this.minWeek);

    if (date !== null) {
      this.minDate = date;
      this.weekUtilityService.setMinDate(date);
    } else {
      this.weekValidatorService.throwInputValueError('minWeek');
    }
  }
}
