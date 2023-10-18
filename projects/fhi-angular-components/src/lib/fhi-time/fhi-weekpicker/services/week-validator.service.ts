import { Injectable } from "@angular/core";
import { WeekErrorStates } from "../week-error-states";
import { FhiTimeConstants } from "../../fhi-time-constants";

@Injectable()
export class WeekValidatorService {
  private _isValid!: boolean;
  private _validYearWeekString!: string;
  private _errorMsg!: string;

  set validYearWeekString(value: string) {
    this._validYearWeekString = value;
  }
  get validYearWeekString(): string {
    return this._validYearWeekString;
  }

  set isValid(value: boolean) {
    this._isValid = value;
  }
  get isValid(): boolean {
    return this._isValid;
  }

  get errorMsg(): string {
    return this._errorMsg;
  }

  setErrorMsg(value: string, errorState?: number) {
    switch (errorState) {
      case WeekErrorStates.toManycharacters:
        this._errorMsg = `
Du har lagt inn en ukeverdi som har for mange tegn.
Korrekt format er <strong>${FhiTimeConstants.weekpickerPlaceholder}</strong>.`;
        break;

      case WeekErrorStates.notValidWeek:
        this._errorMsg = `
Du har lagt inn en ukeverdi (${value}) som ikke finnes.`;
        break;

      default:
        this._errorMsg = `
Du har lagt inn en ukeverdi (${value}) som ikke finnes eller har feil format.
Korrekt format er <strong>${FhiTimeConstants.weekpickerPlaceholder}</strong>.`;
    }
  }
}
