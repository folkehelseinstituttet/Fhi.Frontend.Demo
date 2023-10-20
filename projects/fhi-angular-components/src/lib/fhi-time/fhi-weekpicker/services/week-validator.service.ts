import { Injectable } from "@angular/core";
import { FhiTimeConstants } from "../../fhi-time-constants";

export enum WeekErrorStates {
  toManyCharacters = 1,
  toFewCharacters = 2,
  not53WeeksInThisYear = 3,
  notValidWeek = 4,
  onlyNumbersAllowed = 5,
  weekIsRequired = 6,
  weekOutsideMaxAndMinWeek = 7
}

@Injectable()
export class WeekValidatorService {
  private _isValid!: boolean;
  private _validYearWeekString!: string;
  private _errorMsg!: string;
  private correctFormat = `Korrekt format er <strong>${FhiTimeConstants.weekpickerPlaceholder}</strong>.`;

  weekIsRequired = false;

  set isValid(value: boolean) {
    this._isValid = value;
  }
  get isValid(): boolean {
    return this._isValid;
  }

  set validYearWeekString(value: string) {
    this.isValid = true;
    this._validYearWeekString = value;
  }
  get validYearWeekString(): string {
    return this._validYearWeekString;
  }

  set errorMsg(value: string) {
    this.isValid = false;
    this._errorMsg = value;
  }
  get errorMsg(): string {
    return this._errorMsg;
  }

  setErrorMsg(errorState: number) {
    switch (errorState) {
      case WeekErrorStates.toManyCharacters:
        this.errorMsg = this.getToManyCharactersMsg();
        break;

      case WeekErrorStates.toFewCharacters:
        this.errorMsg = this.getToFewCharactersMsg();
        break;

      case WeekErrorStates.not53WeeksInThisYear:
        this.errorMsg = this.getNot53WeeksInThisYearMsg();
        break;

      case WeekErrorStates.notValidWeek:
        this.errorMsg = this.getNotValidWeekMsg();
        break;

      case WeekErrorStates.onlyNumbersAllowed:
        this.errorMsg = this.getOnlyNumbersAllowedMsg();
        break;

      case WeekErrorStates.weekIsRequired:
        this.errorMsg = this.getWeekIsRequiredMsg();
        break;

      case WeekErrorStates.weekOutsideMaxAndMinWeek:
        this.errorMsg = this.getWeekOutsideMaxAndMinWeekMsg();
        break;
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

