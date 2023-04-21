import { Injectable } from '@angular/core';

import { Data, FhiDiagramSerie } from '../fhi-diagram/fhi-diagram.models';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  getHeaderRow(series: FhiDiagramSerie[]): string[] {
    const tableHeaderRow = series.map(s => s.name) as string[];
    tableHeaderRow.unshift('');


    // const newTableHeaderRows = new Array(tableHeaderRow[1].split(',').length);
    const tmpHeaders = [
        {
            "name": "Hjerteinfarkt, Kvinne, A",
        }, {
            "name": "Hjerteinfarkt, Kvinne, B",
        }, {
            "name": "Hjerteinfarkt, Mann, A",
        }, {
            "name": "Hjerteinfarkt, Mann, B",
        }, {
            "name": "Annen iskemisk hjertesykdom, Kvinne, A",
        }, {
            "name": "Annen iskemisk hjertesykdom, Kvinne, B",
        }, {
            "name": "Annen iskemisk hjertesykdom, Mann, A",
        }, {
            "name": "Annen iskemisk hjertesykdom, Mann, B",
        }, {
            "name": "Karsykdommer i hjernen, Kvinne, A",
        }, {
            "name": "Karsykdommer i hjernen, Kvinne, B",
        }, {
            "name": "Karsykdommer i hjernen, Mann, A",
        }, {
            "name": "Karsykdommer i hjernen, Mann, B",
        }
    ];
    const tmpHeaderRow = tmpHeaders.map(s => s.name) as string[];
    tmpHeaderRow.unshift('');

    const tableHeaderRowCount = tmpHeaderRow[1].split(',').length;
    const newTableHeaderRows = new Array(tableHeaderRowCount);


    for (let j = 0; j < newTableHeaderRows.length; j++) {
      const isLastRow = j + 1 === tableHeaderRowCount;
      let previousCellName: string;
      let colspan: number;

      newTableHeaderRows[j] = new Array(series.length + 1); // + 1 = Label column
      newTableHeaderRows[0][0] = {
        rowspan: tmpHeaderRow[1].split(',').length
      };
      newTableHeaderRows[j][0] = undefined;

      for (let i = 0; i < tmpHeaderRow.length; i++) {
        const isFirstColumn = i === 0;
        const splitHeader = tmpHeaderRow[i].split(',');
        const currentCellName = splitHeader[j];

        if (!isLastRow && !isFirstColumn && currentCellName !== previousCellName) {
          newTableHeaderRows[j][i] = {
            name: currentCellName
          };
        }
        if (isLastRow && !isFirstColumn) {
          newTableHeaderRows[j][i] = {
            name: currentCellName
          };
        }
        previousCellName = currentCellName;
      }
    }

    console.log('newTableHeaderRows', newTableHeaderRows);

    return tableHeaderRow;
  }

  getDataRows(series: FhiDiagramSerie[]): string[][] {
    let dataArray = this.getDataArray(series[0]);
    const tableBodyRows = new Array(dataArray.length);

    // Generate first column in rows
    for (let j = 0; j < dataArray.length; j++) {
      tableBodyRows[j] = new Array(series.length + 1); // + 1 = Label column
      tableBodyRows[j][0] = dataArray[j].name;
    }

    // Populate value-columns in all rows
    for (let i = 0; i < series.length; i++) {
      dataArray = this.getDataArray(series[i]);
      for (let j = 0; j < dataArray.length; j++) {
        tableBodyRows[j][i + 1] = dataArray[j].y;
      }
    }

    console.log('tableBodyRows', tableBodyRows);

    return tableBodyRows;
  }

  private getDataArray(serie: FhiDiagramSerie): Data[] {
    const data = serie.data;
    return data;
  }

}
