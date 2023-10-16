import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
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
import { FhiTimeUtilities } from "../fhi-time-utilities";
import { WeekValidatorService } from "./services/week-validator.service";

@Component({
  selector: "fhi-weekpicker",
  templateUrl: "./fhi-weekpicker.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, FormsModule, NgbDatepickerModule],
  providers: [
    WeekValidatorService,
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
  @Input() initValue: string | null = null;
  @Output() weekSelect = new EventEmitter<any>();

  startDate!: NgbDateStruct;
  placeholder = "åååå-uu"; // TODO: localize

  // TODO: Error handling by a service with subscriptions
  errorMsg!: string;
  yearWeekIsInvalid = false;

  constructor(private weekValidatorService: WeekValidatorService) { }

  ngOnChanges() {
    const date = FhiTimeUtilities.getDateFromYearWeekString(this.initValue);
    if (this.initValue !== null && date === null) {
      this.errorMsg = `Format invalid. Must be "${this.placeholder}"`; // TODO: localize
      this.yearWeekIsInvalid = true;
    } else {
      this.startDate = date;
    }
  }

  onDateSelect(date: NgbDateStruct) {
    const yearAndWeek = FhiTimeUtilities.getYearWeekStringFromDate(date);
    this.weekSelect.emit(yearAndWeek);
  }

  onBlur() {
    this.weekSelect.emit(this.weekValidatorService.validYearWeek);
  }

}

// 1. OK NgbDatepickerI18n
// 2. OK NgbDateAdapter
// 3. OK NgbDateParserFormatter
// 4. OK An optional new model
// 5. OK ValidatorService
// 6. Config?
// 7. Global localizationService?
