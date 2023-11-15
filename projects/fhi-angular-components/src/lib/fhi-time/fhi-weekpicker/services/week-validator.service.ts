import { Injectable } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { toNumber } from 'lodash-es';

import { FhiTimeConstants } from '../../fhi-time-constants';
import { FhiWeek } from '../fhi-week.model';
import { WeekUtilityService } from './week-utility.service';

export enum WeekErrorState {
  toManyCharacters = 1,
  toFewCharacters = 2,
  not53WeeksInThisYear = 3,
  notOneDelimiter = 4,
  notValidWeekNumber = 5,
  onlyNumbersAllowed = 6,
  weekIsRequired = 7,
  weekOutsideMaxOrMin = 8,
}

@Injectable()
export class WeekValidationService {
  private correctFormat = `Korrekt format er <strong>${FhiTimeConstants.weekpickerPlaceholder}</strong>.`;
  private errorMsg: string;
  private unvalidatedYearWeek = {};
  private weekIsRequired = false; // @Inuput() weekIsRequired is not implemented yet

  constructor(private weekUtilityService: WeekUtilityService) {}

  setUnvalidatedYearWeek(value: string) {
    this.unvalidatedYearWeek = value;
  }

  getUnvalidatedFhiWeek() {
    return this.unvalidatedYearWeek;
  }

  getInvalidFeedbackText(): string {
    return this.errorMsg;
  }

  isValidFhiWeek(value: FhiWeek): boolean {
    this.errorMsg = undefined;

    if ((!value.year || !value.week) && !this.weekIsRequired) {
      this.weekUtilityService.setValidYearWeekString(null);
      return true;
    }
    if (
      !this.isValidFhiWeekLength(value.year + FhiTimeConstants.weekpickerDelimiter + value.week)
    ) {
      return false;
    }
    if (!this.isValidFhiWeekParts(value)) {
      return false;
    }
    if (!this.isValidYearWeekObject(value)) {
      return false;
    }
    this.weekUtilityService.setValidYearWeek(value);
    return true;
  }

  isWeekWithinMaxWeekAndMinWeek(date: NgbDateStruct | null): boolean {
    if (this.weekUtilityService.isOutsideMaxOrMin(date)) {
      this.updateErrorMsg(WeekErrorState.weekOutsideMaxOrMin);
      return false;
    }
    return true;
  }

  throwInputValueError(inputName: string) {
    throw new Error(`
The following input has either wrong format, or an illegal value:
@Input() ${inputName}\n
Error message if user input for week had been the cause of the error:
"${this.errorMsg}"\n`);
  }

  private isValidFhiWeekLength(value: string): boolean {
    if (value.length === 0) {
      this.updateErrorMsg(WeekErrorState.weekIsRequired);
      return false;
    }
    if (value.length > 0 && value.length < 6) {
      this.updateErrorMsg(WeekErrorState.toFewCharacters);
      return false;
    }
    if (value.length > 7) {
      this.updateErrorMsg(WeekErrorState.toManyCharacters);
      return false;
    }
    return true;
  }

  private isValidFhiWeekParts(value: FhiWeek): boolean {
    const parts = [value.year, value.week];

    if (parts.length < 2 || parts.length > 2) {
      this.updateErrorMsg(WeekErrorState.notOneDelimiter);
      return false;
    }
    if (isNaN(toNumber(parts[0])) || isNaN(toNumber(parts[1]))) {
      this.updateErrorMsg(WeekErrorState.onlyNumbersAllowed);
      return false;
    }
    return true;
  }

  private isValidYearWeekObject(value: FhiWeek): boolean {
    const yearWeek: FhiWeek = {
      year: value.year,
      week: value.week,
    };
    if (yearWeek.week < 1 || yearWeek.week > 53) {
      this.updateErrorMsg(WeekErrorState.notValidWeekNumber);
      return false;
    }
    if (
      this.weekUtilityService.getLastWeekCurrentYear(yearWeek.year) !== 53 &&
      yearWeek.week === 53
    ) {
      this.updateErrorMsg(WeekErrorState.not53WeeksInThisYear);
      return false;
    }
    this.weekUtilityService.setValidYearWeek(yearWeek);
    return true;
  }

  private updateErrorMsg(errorState: number) {
    this.errorMsg = this.getErrorMsg(errorState);
  }

  private getErrorMsg(errorState: number): string {
    switch (errorState) {
      case WeekErrorState.toManyCharacters:
        return this.getToManyCharactersMsg();

      case WeekErrorState.toFewCharacters:
        return this.getToFewCharactersMsg();

      case WeekErrorState.not53WeeksInThisYear:
        return this.getNot53WeeksInThisYearMsg();

      case WeekErrorState.notOneDelimiter:
        return this.getNotOneDelimiterMsg();

      case WeekErrorState.notValidWeekNumber:
        return this.getNotValidWeekNumberMsg();

      case WeekErrorState.onlyNumbersAllowed:
        return this.getOnlyNumbersAllowedMsg();

      case WeekErrorState.weekIsRequired:
        return this.getWeekIsRequiredMsg();

      case WeekErrorState.weekOutsideMaxOrMin:
        return this.getWeekOutsideMaxOrMinMsg();
    }
  }

  private getToManyCharactersMsg(): string {
    return `Du har lagt inn en ukeverdi som har for mange tegn. ${this.correctFormat}`;
  }

  private getToFewCharactersMsg(): string {
    return `Du har lagt inn en ukeverdi som har for få tegn. ${this.correctFormat}`;
  }

  private getNot53WeeksInThisYearMsg(): string {
    return `Året du har valgt har ikke 53 uker.`;
  }

  private getNotOneDelimiterMsg(): string {
    return `Du har lagt inn en ukeverdi som har for få, eller for mange bindestreker. ${this.correctFormat}`;
  }

  private getNotValidWeekNumberMsg(): string {
    return `Du har lagt inn en ukeverdi som ikke finnes. Uke må være f.o.m. <strong>1</strong> t.o.m. <strong>53</strong>.`;
  }

  private getOnlyNumbersAllowedMsg(): string {
    return `Du har lagt inn en ukeverdi som inneholder bokstaver. Kun tall er lov.`;
  }

  private getWeekIsRequiredMsg(): string {
    return `Verdi for uke er påkrevd.`;
  }

  private getWeekOutsideMaxOrMinMsg(): string {
    return `Du har lagt inn en ukeverdi som ligger utenfor tillatt tidsrom.`;
  }
}
