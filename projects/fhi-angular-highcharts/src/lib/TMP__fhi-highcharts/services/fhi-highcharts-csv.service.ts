import { Injectable } from '@angular/core';
import { Papa, ParseResult } from 'ngx-papaparse';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FhiHighchartsCsvService {

  constructor(private csvParser: Papa) { }

  private _csv: string;
  private parsedCsvSubject = new Subject<ParseResult>();
  parsedCsv$ = this.parsedCsvSubject.asObservable();

  set csv(chartCsv: string) {
    this._csv = chartCsv;
  }
  get csv(): string {
    return this._csv;
  }

  parseHighchartsCsv() {
    this.csvParser.parse(this.csv, {
      complete: parsed => this.parsedCsvSubject.next(parsed)
    });
  }

}
