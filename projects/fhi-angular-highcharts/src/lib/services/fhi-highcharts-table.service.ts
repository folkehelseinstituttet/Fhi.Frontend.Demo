import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FhiHighchartsTableService {

  getHeaderRow(options: Highcharts.Options): string[] {
    if (!options.series) {
      throw new Error('FhiHighchartsTableService.getHeaderRow() -> options.series is undefined');
    }
    // Generate header row
    const tableHeaderRow = options.series.map(s => s.name) as string[];
    tableHeaderRow.unshift('');
    return tableHeaderRow;
  }

  getDataRows(options: Highcharts.Options, includeSumRow: boolean = false): any[][] {
    if (!options.series) {
      throw new Error('FhiHighchartsTableService.getDataRows() -> options.series is undefined');
    }
    // Generate first column in rows
    let sumRowCount = includeSumRow ? 1 : 0;
    let dataArray = this.getDataArray(options.series[0]);
    const tableBodyRows = new Array(dataArray.length+sumRowCount); // +1 = Sum row
    for (let j = 0; j < dataArray.length; j++) {
      tableBodyRows[j] = new Array(options.series.length+1); // +1 = Label column
      tableBodyRows[j][0] = dataArray[j].name;
    }
    if (includeSumRow) {
      // Generate first column ('Sum') of Sum row
      tableBodyRows[dataArray.length] = new Array(options.series.length+1); // +1 = Label column
      tableBodyRows[dataArray.length][0] = 'Sum';
    }
    // Populate value-columns in all rows
    for (let i = 0; i < options.series.length; i++) {
      dataArray = this.getDataArray(options.series[i]);
      let sum = 0.0;
      for (let j = 0; j < dataArray.length; j++) {
        tableBodyRows[j][i+1] = dataArray[j].y;
        if (includeSumRow) {
          sum += dataArray[j].y;
        }
      }
      if (includeSumRow) {
        // Populate sum-columns of sum-row
        tableBodyRows[dataArray.length][i+1] = sum;
      }
    }
    return tableBodyRows;
  }

  getCsv(options: Highcharts.Options): string {
    let headerRow = this.getHeaderRow(options);
    let result = headerRow.map((x) => {
      return '"' + x + '"'
    }).join(';')+'\n';

    let dataRows = this.getDataRows(options, false);
    dataRows.forEach((dataRow, idx, array) => {
      result += dataRow.map((x) => {
        return isNaN(x) ? '"' + x + '"' : x
      }).join(';');

      // Add linefeed except last line
      if (idx < array.length - 1) result += '\n';
    });
    return result;
  }

  private getDataArray(serie: Highcharts.SeriesOptionsType): Array<any> {
    const data = (<any>serie).data;
    return <Array<any>>data;
  }

}
