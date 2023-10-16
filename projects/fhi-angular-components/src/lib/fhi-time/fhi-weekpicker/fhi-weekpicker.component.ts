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

@Component({
  selector: "fhi-weekpicker",
  templateUrl: "./fhi-weekpicker.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, FormsModule, NgbDatepickerModule],
  providers: [
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
  @Input() yearWeek: string | null = null;
  @Output() weekSelect = new EventEmitter<any>();

  startDate!: NgbDateStruct;
  placeholder = "åååå-uu"; // TODO: localize
  id: "id"; // TODO: input
  errorMsg!: string;
  yearWeekIsInvalid = false;

  ngOnChanges() {
    const date = FhiTimeUtilities.getDateFromYearWeekString(this.yearWeek);
    try {
      if (date === null) {
        this.errorMsg = `Format invalid. Must be "${this.placeholder}"`;
        this.yearWeekIsInvalid = true;
      } else {
        this.startDate = date;
      }
    } catch (error) {
      console.error(error);
    }
  }

  onWeekSelect(date: NgbDateStruct) {
    console.log("onWeekSelect", date);
    const yearWeek = FhiTimeUtilities.getYearWeekStringFromDate(date);
    this.weekSelect.emit(yearWeek);
  }
}

// 1. OK NgbDatepickerI18n
// 2. OK NgbDateAdapter
// 3. OK NgbDateParserFormatter
// 4. OK An optional new model
// 5. Config
