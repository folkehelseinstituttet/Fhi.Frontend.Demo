import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { getYear } from 'date-fns';

import { FhiWeekpickerComponent } from '../fhi-weekpicker/fhi-weekpicker.component';
import { WeekUtilityService } from '../fhi-weekpicker/services/week-utility.service';
import { WeekValidatorService } from '../fhi-weekpicker/services/week-validator.service';

@Component({
  selector: 'fhi-week-range',
  standalone: true,
  templateUrl: './fhi-week-range.component.html',
  imports: [ CommonModule, FhiWeekpickerComponent ],
  providers: [ WeekValidatorService, WeekUtilityService ]
})
export class FhiWeekRangeComponent {
  @Input() weekFrom: string | null = null;
  @Input() weekTo: string | null = null;
  @Input() labelWeekFrom: string = 'Fra uke';
  @Input() labelWeekTo: string = 'Til uke';
  @Input() maxWeek: string = getYear(new Date()) + 1 + '-52';
  @Input() minWeek: string = '1900-1';

  @Output() weekRange = new EventEmitter<Object>();

  fromWeekId: string = 'from-week_' + Math.random().toString(36).substring(2, 20);
  maxWeekFrom: string;
  maxWeekTo: string;
  minWeekFrom: string;
  minWeekTo: string;
  toWeekId: string = 'to-week_' + Math.random().toString(36).substring(2, 20);
  validRange: boolean = false;
  
  constructor(
    private weekValidatorService: WeekValidatorService,
    private weekUtilityService: WeekUtilityService
  ) {}

  ngOnInit() {
    this.maxWeekFrom = this.maxWeek;
    this.maxWeekTo = this.maxWeek;
    this.minWeekFrom = this.minWeek;
    this.minWeekTo = this.minWeek;

    if (this.weekFrom && this.weekTo) {
      this.checkWeekRangeValidity();
    }
  }

  getFromWeek(event: string) {
    this.weekFrom = event;
    this.checkWeekRangeValidity();
  }
  getToWeek(event: string) {
    this.weekTo = event;
    this.checkWeekRangeValidity();
  }

  private checkWeekRangeValidity() {
    const fromNgbDateStruct = this.weekUtilityService.getDateFromYearWeekString(this.weekFrom);
    const toNgbDateStruct = this.weekUtilityService.getDateFromYearWeekString(this.weekTo);
    
    const fromDateTimestamp = new Date(fromNgbDateStruct.year + '-' + fromNgbDateStruct.month + '-' + fromNgbDateStruct.day).getTime();
    const toDateTimestamp = new Date(toNgbDateStruct.year + '-' + toNgbDateStruct.month + '-' + toNgbDateStruct.day).getTime();

    if (toDateTimestamp - fromDateTimestamp < 0) {
      this.validRange = true;
    } else {
      this.validRange = false;
    }
  }
}
