import { Injectable } from "@angular/core";
import { FhiTimeConstants } from "../../fhi-time-constants";

export enum WeekErrorState {
  toManyCharacters = 1,
  toFewCharacters = 2,
  not53WeeksInThisYear = 3,
  notValidWeekNumber = 4,
  onlyNumbersAllowed = 5,
  weekIsRequired = 6,
  weekOutsideMaxAndMinWeek = 7
}

export enum WeekValidationContext {
  weekpickerNgOnChanges = 1,
  weekpickerSetStartDateAndEmit = 2,
  weekParserFormatterParse = 3
}

@Injectable()
export class WeekValidatorService {
  private validYearWeekString!: string;
  private correctFormat = `Korrekt format er <strong>${FhiTimeConstants.weekpickerPlaceholder}</strong>.`;
  private validationContext!: number;

  errorMsg: string;
  isValid = true;
  weekIsRequired = false;

  setValidYearWeekString(value: string) {
    this.validYearWeekString = value;
  }

  getValidYearWeekString(): string {
    return this.validYearWeekString;
  }

  setValidationContext(context: number) {
    this.validationContext = context;
  }

  setErrorMsg(errorState: number) {

    console.log('errorState', errorState);

    this.isValid = false;

    if (this.validationContext === WeekValidationContext.weekpickerNgOnChanges) {
      this.throwInputValueError();
    } else {
      this.errorMsg = this.getErrorMsg(errorState);
    }
  }
  
  private getErrorMsg(errorState: number): string {
    switch (errorState) {
      case WeekErrorState.toManyCharacters:
        return this.getToManyCharactersMsg();

      case WeekErrorState.toFewCharacters:
        return this.getToFewCharactersMsg();

      case WeekErrorState.not53WeeksInThisYear:
        return this.getNot53WeeksInThisYearMsg();

      case WeekErrorState.notValidWeekNumber:
        return this.getNotValidWeekNumberMsg();

      case WeekErrorState.onlyNumbersAllowed:
        return this.getOnlyNumbersAllowedMsg();

      case WeekErrorState.weekIsRequired:
        return this.getWeekIsRequiredMsg();

      case WeekErrorState.weekOutsideMaxAndMinWeek:
        return this.getWeekOutsideMaxAndMinWeekMsg();
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

  private getNotValidWeekNumberMsg(): string {
    return `Du har lagt inn en ukeverdi som ikke finnes. Uke må være f.o.m. <strong>1</strong> t.o.m. <strong>53</strong>.`;
  }

  private getOnlyNumbersAllowedMsg(): string {
    return `Du har lagt inn en ukeverdi som inneholder bokstaver. Kun tall er lov.`;
  }

  private getWeekIsRequiredMsg(): string {
    return `Verdi for uke er påkrevd.`;
  }

  private getWeekOutsideMaxAndMinWeekMsg(): string {
    return `Du har lagt inn en ukeverdi som ligger utenfor tillatt tidsrom.`;
  }

  private throwInputValueError() {
    throw new Error(`
One of the following inputs has either wrong format, or an illegal value:
@Input() maxWeek
@Input() minWeek
@Input() week!`);
  }
}

