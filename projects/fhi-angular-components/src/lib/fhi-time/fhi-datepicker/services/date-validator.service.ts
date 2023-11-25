import { Injectable } from '@angular/core';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { toNumber } from 'lodash-es';

export enum ErrorState {
  toManyCharacters = 1,
  toFewCharacters = 2,
  notTwoDelimiters = 3,
  notValidDate = 4,
  onlyNumbersAllowed = 5,
  isRequired = 6,
  outsideMaxOrMin = 7,
}

@Injectable()
export class DateValidationService {
  private unvalidatedDateString: string;
  private dateFormat = 'dd.mm.åååå'; // TODO: constants
  private dateIsRequired = true; // @Inuput() weekIsRequired is not implemented yet
  private errorMsg: string;

  constructor(private ngbCalendar: NgbCalendar) {}

  setUnvalidatedDateString(value: string) {
    this.unvalidatedDateString = value;
  }

  getUnvalidatedDateString() {
    return this.unvalidatedDateString;
  }

  getInvalidFeedbackText(): string {
    return this.errorMsg;
  }

  isValidDateString(value: string): boolean {
    this.errorMsg = undefined;

    if (value.length === 0 && !this.dateIsRequired) {
      return true;
    }
    if (!this.isValidDateStringLength(value)) {
      return false;
    }
    if (!this.isValidDate(value)) {
      return false;
    }
    // if (!this.isValidDateObject(value)) {
    //   return false;
    // }
    return true;
  }

  throwInputValueError(inputName: string) {
    throw new Error(`
The following input has either wrong format, or an illegal value:
@Input() ${inputName}\n
Error message if user input for week had been the cause of the error:
"${this.errorMsg}"\n`);
  }

  private isValidDateStringLength(value: string): boolean {
    if (value.length === 0) {
      this.updateErrorMsg(ErrorState.isRequired);
      return false;
    }
    if (value.length > 0 && value.length < 10) {
      this.updateErrorMsg(ErrorState.toFewCharacters);
      return false;
    }
    if (value.length > 10) {
      this.updateErrorMsg(ErrorState.toManyCharacters);
      return false;
    }
    return true;
  }

  private isValidDate(value: string) {
    const parts = value.split('.'); // TODO: constants

    if (parts.length < 3 || parts.length > 3) {
      this.updateErrorMsg(ErrorState.notTwoDelimiters);
      return false;
    }

    const year = toNumber(parts[2]);
    const month = toNumber(parts[1]);
    const day = toNumber(parts[0]);

    if (isNaN(year) || isNaN(month) || isNaN(day)) {
      this.updateErrorMsg(ErrorState.onlyNumbersAllowed);
      return false;
    }

    const date = new NgbDate(year, month, day);
    console.log('date', date);
    if (!this.ngbCalendar.isValid(date)) {
      this.updateErrorMsg(ErrorState.notValidDate);
      return false;
    }
    return true;
  }

  private updateErrorMsg(errorState: number) {
    this.errorMsg = this.getErrorMsg(errorState);
  }

  private getErrorMsg(errorState: number): string {
    switch (errorState) {
      case ErrorState.isRequired:
        return this.getDateIsRequiredMsg();

      case ErrorState.toFewCharacters ||
        ErrorState.toManyCharacters ||
        ErrorState.notTwoDelimiters ||
        ErrorState.onlyNumbersAllowed:
        return this.getWrongFormatMsg();

      case ErrorState.notValidDate:
        return this.getNonexistentDateMsg();

      case ErrorState.outsideMaxOrMin:
        return this.getOutsideMaxOrMinMsg();
    }
  }

  private getDateIsRequiredMsg(): string {
    return `Dato er påkrevd.`;
  }

  private getWrongFormatMsg(): string {
    return `Du har lagt inn en dato som har feil format. Korrekt format er <strong>${this.dateFormat}</strong>`;
  }

  private getOutsideMaxOrMinMsg(): string {
    return `Du har lagt inn en dato som ligger utenfor tillatt tidsrom.`;
  }

  private getNonexistentDateMsg(): string {
    return `Du har lagt inn en dato som ikke finnes.`;
  }
}
