import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FhiHighchartsCsvService {

  private _csv!: string;

  set csv(chartCsv: string) {
    this._csv = chartCsv;
  }

  get csv(): string {
    return this._csv;
  }

}
