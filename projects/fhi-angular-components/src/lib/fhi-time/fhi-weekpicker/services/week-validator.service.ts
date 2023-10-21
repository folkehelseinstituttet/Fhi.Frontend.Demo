import { Injectable } from "@angular/core";
import { FhiTimeConstants } from "../../fhi-time-constants";

export enum WeekErrorStates {
  toManyCharacters = 1,
  toFewCharacters = 2,
  not53WeeksInThisYear = 3,
  notValidWeek = 4,
  notValidWeekNumber = 5,
  onlyNumbersAllowed = 6,
  weekIsRequired = 7,
  weekOutsideMaxAndMinWeek = 8
}

@Injectable()
export class WeekValidatorService {
  private _validYearWeekString!: string;
  private correctFormat = `Korrekt format er <strong>${FhiTimeConstants.weekpickerPlaceholder}</strong>.`;
  private validationTriggeredByParser = false;

  errorMsg: string;
  isValid!: boolean;
  weekIsRequired = false;

  set validYearWeekString(value: string) {
    this.isValid = true;
    this._validYearWeekString = value;
  }
  get validYearWeekString(): string {
    return this._validYearWeekString;
  }

  setValidationTriggeredByParser(value: boolean) {
    console.log('validationTriggeredByParser', value);
    this.validationTriggeredByParser = value;
  }

  setErrorMsg(errorState: number) {
    if (this.validationTriggeredByParser) {
      this.isValid = false;
      this.errorMsg = this.getErrorMsg(errorState);
    } else {
      throw new Error(`
One of the following inputs has either wrong format, or an illegal value:
@Input() maxWeek
@Input() minWeek
@Input() week!`);
    }
    this.validationTriggeredByParser = false;
  }
  
  private getErrorMsg(errorState: number): string {
    switch (errorState) {
      case WeekErrorStates.toManyCharacters:
        return this.getToManyCharactersMsg();

      case WeekErrorStates.toFewCharacters:
        return this.getToFewCharactersMsg();

      case WeekErrorStates.not53WeeksInThisYear:
        return this.getNot53WeeksInThisYearMsg();

      // TODO: do we need this one?
      case WeekErrorStates.notValidWeek:
        return this.getNotValidWeekMsg();

      case WeekErrorStates.notValidWeekNumber:
        return this.getNotValidWeekNumberMsg();

      case WeekErrorStates.onlyNumbersAllowed:
        return this.getOnlyNumbersAllowedMsg();

      case WeekErrorStates.weekIsRequired:
        return this.getWeekIsRequiredMsg();

      case WeekErrorStates.weekOutsideMaxAndMinWeek:
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

  private getNotValidWeekMsg(): string {
    return `Du har lagt inn en ukeverdi som ikke finnes, eller er på feil format. ${this.correctFormat}`;
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

}

