import { Injectable } from "@angular/core";
import { FhiTimeConstants } from "../../fhi-time-constants";

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

export enum WeekValidationContext {
  weekpickerNgOnChanges = 1,
  weekpickerSetStartDateAndEmit = 2,
  weekpickerMaxWeekChangeActions = 3,
  weekpickerMinWeekChangeActions = 4,
  weekParserFormatterParse = 5
}

@Injectable()
export class WeekValidatorService {
  private validYearWeekString!: string;
  private correctFormat = `Korrekt format er <strong>${FhiTimeConstants.weekpickerPlaceholder}</strong>.`;
  private validationContext!: number;

  errorMsg: string;
  isValid = true;
  weekIsRequired = false;

  updateValidWeekStringAndState(value: string) {
    this.validYearWeekString = value;
    this.isValid = true;
  }

  updateErrorMsgAndState(errorState: number) {
    this.errorMsg = this.getErrorMsg(errorState);
    this.isValid = false;
  }

  getIsValid(): boolean {
    return this.isValid;
  }

  getValidYearWeekString(): string {
    return this.validYearWeekString;
  }

  setValidationContext(context: number) {
    this.validationContext = context;
  }

  getValidationContext(): number {
    return this.validationContext;
  }

  throwInputValueError(inputName: string) {
    throw new Error(`
The following input has either wrong format, or an illegal value: @Input() ${inputName}\n
Klient error message: ${this.errorMsg}\n`);
  }
  





  handleValidationIfValueIsRequired() {
    if (this.weekIsRequired) {
      this.updateErrorMsgAndState(WeekErrorState.weekIsRequired);
    } else {
      this.isValid = true;
    }
  }

  // updateErrorMsgAndState(errorState: number) {
  //   this.isValid = false;

  //   console.log('this.validationContext', this.validationContext);

  //   if (this.validationContext === WeekValidationContext.weekpickerNgOnChanges ||
  //       this.validationContext === WeekValidationContext.weekpickerMaxWeekChangeActions ||
  //       this.validationContext === WeekValidationContext.weekpickerMinWeekChangeActions) {
  //     this.throwInputValueErrorOLD();
  //   } else {
  //     this.errorMsg = this.getErrorMsg(errorState);
  //   }
  // }





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

