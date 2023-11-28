import { Injectable } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { toNumber } from 'lodash-es';

import { FhiTimeConstants } from '../../fhi-time-constants';
import { FhiWeek } from '../../fhi-week.model';
import { WeekUtilityService } from './week-utility.service';
import { getISOWeek, lastDayOfYear } from 'date-fns';

export enum ErrorState {
  toManyCharacters = 1,
  toFewCharacters = 2,
  toManyCharactersInPart = 3,
  toFewCharactersInPart = 4,
  not53WeeksInThisYear = 5,
  notOneDelimiter = 6,
  notValidWeekNumber = 7,
  onlyNumbersAllowed = 8,
  isRequired = 9,
  outsideMaxOrMin = 10,
}

@Injectable()
export class WeekValidationService {
  private correctFormat = `Korrekt format er <strong>${FhiTimeConstants.weekpickerPlaceholder}</strong>.`;
  private errorMsg: string;
  private unvalidatedWeekString = '';
  private week!: FhiWeek;
  private isRequired = false; // @Inuput() isRequired is not implemented yet

  constructor(private weekUtilityService: WeekUtilityService) {}

  getUnvalidatedWeekString() {
    return this.unvalidatedWeekString;
  }
  setUnvalidatedWeekString(value: string) {
    this.unvalidatedWeekString = value;
  }

  getInvalidFeedbackText(): string {
    return this.errorMsg;
  }

  throwInputValueError(inputName: string) {
    throw new Error(`
The following input has either wrong format, or an illegal value:
@Input() ${inputName}\n
Error message if user input for week had been the cause of the error:
"${this.errorMsg}"\n`);
  }

  isValidWeek(week: FhiWeek): boolean {
    this.week = week;

    // TODO: remove call to method in date-validation as well
    this.unvalidatedWeekString = this.weekUtilityService.geWeekStringFromWeek(week);

    // TODO: same naming date-validation as well
    if (!this.isValidFhiWeek()) {
      return false;
    }
    return true;
  }

  isValidWeekString(value: string): boolean {
    if (value.length === 0 && !this.isRequired) {
      return true;
    }
    if (!this.isValidWeekStringLength(value)) {
      return false;
    }
    // TODO: add isValidAllPartsOfString to date-validation as well
    if (!this.isValidAllPartsOfString(value)) {
      return false;
    }
    if (!this.isValidFhiWeek()) {
      return false;
    }
    if (!this.isWithinMinWeekAndMaxWeek()) {
      return false;
    }
    return true;
  }

  private isValidWeekStringLength(value: string): boolean {
    if (value.length === 0) {
      this.updateErrorMsg(ErrorState.isRequired);
      return false;
    }
    if (value.length > 0 && value.length < 6) {
      this.updateErrorMsg(ErrorState.toFewCharacters);
      return false;
    }
    if (value.length > 7) {
      this.updateErrorMsg(ErrorState.toManyCharacters);
      return false;
    }
    return true;
  }

  private isValidAllPartsOfString(value: string): boolean {
    const parts = value.split(FhiTimeConstants.weekpickerDelimiter);

    if (parts.length < 2 || parts.length > 2) {
      this.updateErrorMsg(ErrorState.notOneDelimiter);
      return false;
    }
    if (parts[0].length < 4 || parts[1].length < 1) {
      this.updateErrorMsg(ErrorState.toFewCharactersInPart);
      return false;
    }
    if (parts[0].length > 4 || parts[1].length > 2) {
      this.updateErrorMsg(ErrorState.toManyCharactersInPart);
      return false;
    }
    const year = toNumber(parts[0]);
    const week = toNumber(parts[1]);

    if (isNaN(year) || isNaN(week)) {
      this.updateErrorMsg(ErrorState.onlyNumbersAllowed);
      return false;
    }
    this.week = { year: year, week: week };
    return true;
  }

  private isValidFhiWeek() {
    const year = this.week.year;
    const week = this.week.week;

    if (week < 1 || week > 53) {
      this.updateErrorMsg(ErrorState.notValidWeekNumber);
      return false;
    }
    if (getISOWeek(lastDayOfYear(new Date(year, 0))) !== 53 && week === 53) {
      this.updateErrorMsg(ErrorState.not53WeeksInThisYear);
      return false;
    }
    return true;
  }

  private isWithinMinWeekAndMaxWeek(): boolean {
    const date = this.weekUtilityService.getDateFromWeek(this.week);
    const minDate = this.weekUtilityService.getMinDate();
    const maxDate = this.weekUtilityService.getMaxDate();
    const isOutsideMaxOrMin =
      NgbDate.from(date).before(minDate) || NgbDate.from(date).after(maxDate);

    if (isOutsideMaxOrMin) {
      this.updateErrorMsg(ErrorState.outsideMaxOrMin);
      return false;
    }
    return true;
  }

  private updateErrorMsg(errorState: number) {
    this.errorMsg = this.getErrorMsg(errorState);
  }

  private getErrorMsg(errorState: number): string {
    switch (errorState) {
      case ErrorState.toManyCharacters:
        return this.getToManyCharactersMsg();

      case ErrorState.toFewCharacters:
        return this.getToFewCharactersMsg();

      case ErrorState.not53WeeksInThisYear:
        return this.getNot53WeeksInThisYearMsg();

      case ErrorState.notOneDelimiter:
        return this.getNotOneDelimiterMsg();

      case ErrorState.notValidWeekNumber:
        return this.getNotValidWeekNumberMsg();

      case ErrorState.onlyNumbersAllowed:
        return this.getOnlyNumbersAllowedMsg();

      case ErrorState.isRequired:
        return this.getWeekIsRequiredMsg();

      case ErrorState.outsideMaxOrMin:
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
