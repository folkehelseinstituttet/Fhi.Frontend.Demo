import { Injectable } from '@angular/core';

import { FhiDiagramSerieData } from '../models/fhi-diagram-serie-data.model';
import { FhiDiagramSerie } from '../models/fhi-diagram-serie.model';
import { DiagramSerieNameSeperator as Seperator } from '../constants-and-enums/diagram-serie-name-seperator';

interface TableHeaderCell {
  name?: string;
  colspan?: number;
  rowspan?: number;
}

@Injectable()
export class TableService {
  getHeaderRowByDataName(series: FhiDiagramSerie[]): TableHeaderCell[][] {
    const tableHeaderRow: any[] = [];
    series[0].data.forEach((data, index) => {
      if (index === 0) {
        tableHeaderRow.push({ rowspan: this.getRowspanCount(series[0].name) });
      }
      tableHeaderRow.push({ name: data.name });
    });
    console.log(tableHeaderRow);
    return [tableHeaderRow];
  }

  getDataRowsBySerieName(series: FhiDiagramSerie[]) {
    const rowDimentionsCount = this.getRowspanCount(series[0].name);
    const tableBodyRows = new Array(series.length);

    for (let i = 0; i < tableBodyRows.length; i++) {
      tableBodyRows[i] = new Array(series[0].data.length + rowDimentionsCount); // + Label columns

      for (let j = 0; j < tableBodyRows[i].length; j++) {
        if (j < rowDimentionsCount) {
          tableBodyRows[i][j] = 'heading';
        } else {
          tableBodyRows[i][j] = 0;
        }
      }
    }
    console.log(tableBodyRows);
  }

  getHeaderRows(series: FhiDiagramSerie[]): TableHeaderCell[][] {
    const seriesMappedToNameOnly = series.map((serie) => serie.name) as string[];
    const tableHeaderRowCount = seriesMappedToNameOnly[0].split(Seperator.output).length;
    const tableHeaderRows: TableHeaderCell[][] = new Array(tableHeaderRowCount);

    for (let j = 0; j < tableHeaderRows.length; j++) {
      const isLastRow = j + 1 === tableHeaderRowCount;
      let previousCellName: string | undefined = undefined;
      let colspanDivider = 0;
      tableHeaderRows[j] = new Array(seriesMappedToNameOnly.length);

      for (let i = 0; i < seriesMappedToNameOnly.length; i++) {
        const splitHeader = seriesMappedToNameOnly[i].split(Seperator.output);
        const currentCellName = splitHeader[j].trim();

        if (!isLastRow && currentCellName !== previousCellName) {
          tableHeaderRows[j][i] = {
            name: currentCellName,
            colspan: seriesMappedToNameOnly.length / 3,
          };
          colspanDivider = colspanDivider + 1;
        }
        if (isLastRow) {
          tableHeaderRows[j][i] = { name: currentCellName };
        }
        previousCellName = currentCellName;
      }
      tableHeaderRows[j].forEach((i) => {
        i.colspan = seriesMappedToNameOnly.length / colspanDivider;
      });
      tableHeaderRows[j].unshift({}); // Label column
    }
    tableHeaderRows[0][0] = { rowspan: tableHeaderRowCount }; // Label column
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

  private getDataArray(serie: FhiDiagramSerie): FhiDiagramSerieData[] {
    const data = serie.data;
    return data;
  }

  // TODO: better naming (get <thead> first cells rowspan count)
  //       OR rowDimentionsCount ?
  private getRowspanCount(name: string | string[]): number {
    if (typeof name === 'string') {
      return name.split(Seperator.input).length;
    }
    return name.length;
  }
}
