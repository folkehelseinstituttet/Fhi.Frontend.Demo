import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FhiHighchartsTableService {

  getTable(data: string[][]): string[][] {
    return this.buildTable(data);
  }

  private buildTable(data: string[][]) {
    const rowLength: number = data[0].length;
    const table = new Array<string[]>();
    let columnSums = new Array<string>();
    data.forEach((dataRow: Array<string>, i: number) => {
      table[i] = this.getTableRow(dataRow, rowLength);
      this.updateColumnSums(columnSums, table[i], rowLength);
    });
    table[table.length] = columnSums;
    return table;
  }

  private getTableRow(dataRow: string[], rowLength: number) {
    let tableRow = new Array<string>();
    for (let i = 0; i < rowLength; i++) {
      if (i !== 0 && (dataRow[i] === undefined || dataRow[i] === '')) {
        tableRow[i] = '0';
      } else {
        tableRow[i] = dataRow[i];
      }
    }
    return tableRow;
  }

  private updateColumnSums(columnSums: Array<string>, row: string[], rowLength: number) {
    for (let i = 0; i < rowLength; i++) {
      if (i === 0 && columnSums[i] === undefined) {
        columnSums[i] = 'Sum';
      } else if (i !== 0 && columnSums[i] === undefined) {
        columnSums[i] = '0'
      } else if (i !== 0) {
        columnSums[i] = (+columnSums[i] + +row[i]).toString();
      }
    }
  }

}
