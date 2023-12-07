import { Injectable } from '@angular/core';
import { Chart } from 'highcharts';

@Injectable()
export class ChartInstanceService {
  private _chart!: Chart;

  set chart(chart: Chart) {
    this._chart = chart;
  }
  get chart(): Chart {
    return this._chart;
  }
}
