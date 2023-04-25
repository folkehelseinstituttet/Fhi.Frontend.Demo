import { Injectable } from '@angular/core';

import { Data, FhiDiagramSerie, TableHeaderCell } from '../fhi-diagram/fhi-diagram.models';
import { forEach } from 'lodash-es';


@Injectable({
  providedIn: 'root'
})
export class TableService {

  getHeaderRows__OLD(series: FhiDiagramSerie[]): TableHeaderCell[][] {
    const tmpHeaderRow = series.map(s => s.name) as string[];
    tmpHeaderRow.unshift('');

    const tableHeaderRowCount = tmpHeaderRow[1].split(',').length;
    const tableHeaderRows: TableHeaderCell[][] = new Array(tableHeaderRowCount);

    for (let j = 0; j < tableHeaderRows.length; j++) {
      const isLastRow = j + 1 === tableHeaderRowCount;
      let previousCellName: string;
      let iPreviouForColspan: number;

      tableHeaderRows[j] = new Array(series.length + 1); // + 1 = Label column
      tableHeaderRows[0][0] = {
        rowspan: tableHeaderRowCount
      };
      if (j > 0) {
        tableHeaderRows[j][0] = undefined;
      }

      for (let i = 0; i < tmpHeaderRow.length; i++) {
        const isFirstColumn = i === 0;
        const splitHeader = tmpHeaderRow[i].split(',');
        const currentCellName = splitHeader[j];
        let colspan: number;

        if (!isLastRow && !isFirstColumn && currentCellName !== previousCellName) {
          colspan = i - iPreviouForColspan;
          tableHeaderRows[j][i] = {
            name: currentCellName,
            colspan: colspan
          };
          tableHeaderRows[j][1].colspan =  (colspan) ? colspan : splitHeader.length
          iPreviouForColspan = i;
        }
        if (isLastRow && !isFirstColumn) {
          tableHeaderRows[j][i] = {
            name: currentCellName
          };
        }
        previousCellName = currentCellName;
      }
    }
    return tableHeaderRows;
  }

  getHeaderRows(series: FhiDiagramSerie[]): TableHeaderCell[][] {

    const tmp = [
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
    const commaSeparatedHeaderRow = tmp.map(s => s.name) as string[];

    // const commaSeparatedHeaderRow = series.map(s => s.name) as string[];
    const tableHeaderRowCount = commaSeparatedHeaderRow[0].split(',').length;
    const tableHeaderRows: TableHeaderCell[][] = new Array(tableHeaderRowCount);

    for (let j = 0; j < tableHeaderRows.length; j++) {
      const isLastRow = j + 1 === tableHeaderRowCount;
      let previousCellName: string;
      let colspanDivider = 0;
      tableHeaderRows[j] = new Array(commaSeparatedHeaderRow.length);

      for (let i = 0; i < commaSeparatedHeaderRow.length; i++) {
        const splitHeader = commaSeparatedHeaderRow[i].split(',');
        const currentCellName = splitHeader[j];

        if (!isLastRow && currentCellName !== previousCellName) {
          tableHeaderRows[j][i] = {
            name: currentCellName,
            colspan: commaSeparatedHeaderRow.length / 3
          };
          colspanDivider = colspanDivider + 1;
        }
        if (isLastRow) {
          tableHeaderRows[j][i] = { name: currentCellName };
        }
        previousCellName = currentCellName;
      }
      tableHeaderRows[j].forEach(i => {
        i.colspan = commaSeparatedHeaderRow.length / colspanDivider
      });
      tableHeaderRows[j].unshift(undefined); // Label column
    }
    tableHeaderRows[0][0] = { rowspan: tableHeaderRowCount }; // Label column

    console.log('tableHeaderRows', tableHeaderRows);

    return tableHeaderRows;
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
    return tableBodyRows;
  }

  private getDataArray(serie: FhiDiagramSerie): Data[] {
    const data = serie.data;
    return data;
  }

}
