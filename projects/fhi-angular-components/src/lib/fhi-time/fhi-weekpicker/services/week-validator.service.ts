import { Injectable } from "@angular/core";
import { toNumber } from 'lodash-es';

import { FhiTimeConstants } from "../../fhi-time-constants";
import { YearWeek } from "../year-week.model";
import { WeekSharedDataService } from "./week-shared-data.service";
import { WeekUtilityService } from "./week-utility.service";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

export enum WeekErrorState {
  toManyCharacters = 1,
  toFewCharacters = 2,
  not53WeeksInThisYear = 3,
  notOneDelimiter = 4,
  notValidWeekNumber = 5,
  onlyNumbersAllowed = 6,
  weekIsRequired = 7,
  weekOutsideMaxOrMin = 8
}

@Injectable()
export class WeekValidatorService {
  private correctFormat = `Korrekt format er <strong>${FhiTimeConstants.weekpickerPlaceholder}</strong>.`;
  private unvalidatedYearWeekString = '';
  private weekIsRequired = false;


  errorMsg: string;


  constructor(

    // TODO: use FhiTimeConstants instead unless some realy good reason for keeping WeekSharedDataService
    private weekSharedDataService: WeekSharedDataService,
  
    private weekUtilityService: WeekUtilityService
  ) { }

  updateErrorMsg(errorState: number) {
    this.errorMsg = this.getErrorMsg(errorState);
  }

  setUnvalidatedYearWeekString(value: string) {
    this.unvalidatedYearWeekString = value;
  }

  getUnvalidatedYearWeekString() {
    return this.unvalidatedYearWeekString;
  }


  private isValidYearWeekStringLength(value: string): boolean {
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


  isValidYearWeekString(value: string): boolean {
    this.errorMsg = undefined;


    console.log('isValidYearWeekString(value):', value);


    // Accepting string length 0 if week is not required
    if (value.length === 0 && !this.weekIsRequired) {
      this.weekUtilityService.setValidYearWeekString('');
      return true;
    }

    if (!this.isValidYearWeekStringLength(value)) {
      return false;
    }



    // Testing parts of the string

    const parts = value.split(this.weekSharedDataService.weekpickerDelimiter);

    if (parts.length < 2 || parts.length > 2) {
      this.updateErrorMsg(WeekErrorState.notOneDelimiter);
      return false;
    }
    if (isNaN(toNumber(parts[0])) || isNaN(toNumber(parts[1]))) {
      this.updateErrorMsg(WeekErrorState.onlyNumbersAllowed);
      return false;
    }

    // Testing the yearWeekObject

    const yearWeek: YearWeek =  {
      year: parseInt(parts[0], 10),
      week: parseInt(parts[1], 10)
    };
    
    if (yearWeek.week < 1 || yearWeek.week > 53) {
      this.updateErrorMsg(WeekErrorState.notValidWeekNumber);
      return false;
    }
    this.weekUtilityService.setValidYearWeek(yearWeek);

    // Testing lastWeekCurrentYear

    // TODO: This is not optimal...
    const lastWeekCurrentYear = this.weekUtilityService.getLastWeekCurrentYear(yearWeek.year);

    if (yearWeek.week === 53 && lastWeekCurrentYear !== 53) {
      this.updateErrorMsg(WeekErrorState.not53WeeksInThisYear);
      return false;
    }


    this.weekUtilityService.setValidYearWeekString(value);
    return true;
  }

  weekWithinMaxWeekAndMinWeek(date: NgbDateStruct | null): boolean {

    // console.log('this.weekUtilityService.getIsOutsideMaxOrMin(date)', this.weekUtilityService.isOutsideMaxOrMin(date));

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

