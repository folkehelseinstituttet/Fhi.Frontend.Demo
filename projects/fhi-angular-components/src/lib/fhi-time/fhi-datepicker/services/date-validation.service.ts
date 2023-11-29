import { Injectable } from '@angular/core';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { toNumber } from 'lodash-es';
import { FhiDate } from '../../shared/models/public/fhi-date.model';
import { DateUtilityService } from './date-utility.service';

export enum ErrorState {
  toManyCharacters = 1,
  toManyCharactersInPart = 2,
  toFewCharacters = 3,
  toFewCharactersInPart = 4,
  notTwoDelimiters = 5,
  notValidDate = 6,
  onlyNumbersAllowed = 7,
  isRequired = 8,
  outsideMaxOrMin = 9,
}

@Injectable()
export class DateValidationService {
  private unvalidatedDateString = '';
  private date!: FhiDate;
  private dateFormat = 'dd.mm.åååå'; // TODO: constants (naming: 'dd.mm.åååå' VS. 'dd.MM.yyyy'? Both are NO formats...)
  private dateIsRequired = true; // @Inuput() weekIsRequired is not implemented yet
  private errorMsg!: string;

  constructor(
    private ngbCalendar: NgbCalendar,
    private dateUtilityService: DateUtilityService,
  ) {}

  setUnvalidatedDateString(value: string) {
    this.unvalidatedDateString = value;
  }

  getUnvalidatedDateString() {
    return this.unvalidatedDateString;
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

  isValidDate(date: FhiDate): boolean {
    this.date = date;
    this.unvalidatedDateString = this.dateUtilityService.getLocalDateString(date);

    if (!this.isValidFhiDate()) {
      return false;
    }
    return true;
  }

  isValidDateString(value: string): boolean {
    if (value.length === 0 && !this.dateIsRequired) {
      return true;
    }
    if (!this.isValidDateStringLength(value)) {
      return false;
    }
    if (!this.isValidAllPartsOfString(value)) {
      return false;
    }
    if (!this.isValidFhiDate()) {
      return false;
    }
    if (!this.isWithinMinDateAndMaxDate()) {
      return false;
    }
    return true;
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

  private isValidAllPartsOfString(value: string): boolean {
    const parts = value.split('.'); // TODO: constants

    if (parts.length < 3 || parts.length > 3) {
      this.updateErrorMsg(ErrorState.notTwoDelimiters);
      return false;
    }
    if (parts[2].length < 4 || parts[1].length < 2 || parts[0].length < 2) {
      this.updateErrorMsg(ErrorState.toFewCharactersInPart);
      return false;
    }
    if (parts[2].length > 4 || parts[1].length > 2 || parts[0].length > 2) {
      this.updateErrorMsg(ErrorState.toManyCharactersInPart);
      return false;
    }
    const year = toNumber(parts[2]);
    const month = toNumber(parts[1]);
    const day = toNumber(parts[0]);

    if (isNaN(year) || isNaN(month) || isNaN(day)) {
      this.updateErrorMsg(ErrorState.onlyNumbersAllowed);
      return false;
    }
    this.date = { year: year, month: month, day: day };
    return true;
  }

  private isValidFhiDate(): boolean {
    const date = this.dateUtilityService.getNgbDateFromFhiDate(this.date);
    if (!this.ngbCalendar.isValid(date)) {
      this.updateErrorMsg(ErrorState.notValidDate);
      return false;
    }
    return true;
  }

  private isWithinMinDateAndMaxDate(): boolean {
    const minDate = this.dateUtilityService.getMinDate();
    const maxDate = this.dateUtilityService.getMaxDate();
    const isOutsideMaxOrMin =
      NgbDate.from(this.date).before(minDate) || NgbDate.from(this.date).after(maxDate);

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
      case ErrorState.isRequired:
        return this.getDateIsRequiredMsg();

      case ErrorState.notValidDate:
        return this.getNonexistentDateMsg();

      case ErrorState.outsideMaxOrMin:
        return this.getOutsideMaxOrMinMsg();

      case ErrorState.toFewCharacters:
      case ErrorState.toFewCharactersInPart:
      case ErrorState.toManyCharacters:
      case ErrorState.toManyCharactersInPart:
      case ErrorState.notTwoDelimiters:
      case ErrorState.onlyNumbersAllowed:
        return this.getWrongFormatMsg();
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
