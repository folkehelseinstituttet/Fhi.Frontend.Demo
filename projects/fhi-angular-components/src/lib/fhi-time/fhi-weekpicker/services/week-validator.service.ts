import { Injectable } from "@angular/core";

@Injectable()
export class WeekValidatorService {
  validYearWeek = '2023-42'
  validate() {
    console.error('Noe kan være feil, vet ikke, kanskje...');
  }
}
