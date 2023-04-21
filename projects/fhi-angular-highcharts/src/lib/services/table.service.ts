import { Injectable } from '@angular/core';

import { Data, FhiDiagramSerie } from '../fhi-diagram/fhi-diagram.models';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  getHeaderRow(series: FhiDiagramSerie[]): string[] {
    const tableHeaderRow = series.map(s => s.name) as string[];
    tableHeaderRow.unshift('');
    return tableHeaderRow;
  }

  getDataRows(series: FhiDiagramSerie[]): string[][] {
    let dataArray = this.getDataArray(series[0]);
    const tableBodyRows = new Array(dataArray.length);

    // Generate first column in rows
    for (let j = 0; j < dataArray.length; j++) {
      tableBodyRows[j] = new Array(series.length + 1); // +1 = Label column
      tableBodyRows[j][0] = dataArray[j].name;
    }

    // Populate value-columns in all rows
    for (let i = 0; i < series.length; i++) {
      dataArray = this.getDataArray(series[i]);
      for (let j = 0; j < dataArray.length; j++) {
        tableBodyRows[j][i+1] = dataArray[j].y;
      }
    }
    return tableBodyRows;
  }

  private getDataArray(serie: FhiDiagramSerie): Data[] {
    const data = serie.data;
    return data;
  }

}
