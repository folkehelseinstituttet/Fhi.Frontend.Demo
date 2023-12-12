import { Injectable } from '@angular/core';

@Injectable()
export class CsvService {
  private _csv!: string;

  set csv(chartCsv: string) {
    this._csv = chartCsv;
  }

  get csv(): string {
    return this._csv;
  }
}
