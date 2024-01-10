import { Injectable } from '@angular/core';

import { FhiDiagramSerie } from '../models/fhi-diagram-serie.model';
import { DiagramSerieNameSeperator as Seperator } from '../constants-and-enums/diagram-serie-name-seperator';

interface TableHeaderCell {
  name?: string | undefined;
  colspan?: number;
  rowspan?: number;
}
interface TableData {
  theadRows: TableHeaderCell[][];
  tbodyRows: (string | number | TableHeaderCell)[][];
}

@Injectable()
export class TableService {
  // ----------------------------
  //    OLD TABLE ORIENTATION
  // ----------------------------

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
    let dataArray = series[0].data;
    const tableBodyRows = new Array(dataArray.length);

    // Generate first column in rows
    for (let j = 0; j < dataArray.length; j++) {
      tableBodyRows[j] = new Array(series.length + 1); // + 1 = Label column
      tableBodyRows[j][0] = dataArray[j].name;
    }

    // Populate value-columns in all rows
    for (let i = 0; i < series.length; i++) {
      dataArray = series[i].data;
      for (let j = 0; j < dataArray.length; j++) {
        tableBodyRows[j][i + 1] = dataArray[j].y;
      }
    }
    return tableBodyRows;
  }

  // ----------------------------
  //    NEW TABLE ORIENTATION
  // ----------------------------
  getTableData(series: FhiDiagramSerie[], xAxisHeadings = 'rows'): TableData {
    if (xAxisHeadings === 'rows') {
      return {
        theadRows: this.getTableHeaderRow(series),
        tbodyRows: this.getTableBodyRows(series),
      };
    }
  }

  private getTableHeaderRow(series: FhiDiagramSerie[]): TableHeaderCell[][] {
    const tableHeaderRow: TableHeaderCell[] = [];
    series[0].data.forEach((data, index) => {
      if (index === 0) {
        tableHeaderRow.push({
          name: undefined,
          rowspan: this.getNumberOfRowDimentions(series[0].name),
        });
      }
      tableHeaderRow.push({ name: data.name, rowspan: undefined });
    });
    console.log(tableHeaderRow);
    return [tableHeaderRow];
  }

  private getTableBodyRows(series: FhiDiagramSerie[]): (string | number | TableHeaderCell)[][] {
    const rowDimentionsCount = this.getNumberOfRowDimentions(series[0].name);
    const colspanValues = this.getColspanValues(rowDimentionsCount, series);
    const tbodyRows = new Array<Array<string | number | TableHeaderCell>>(series.length);

    for (let i = 0; i < tbodyRows.length; i++) {
      // Create extra table columns for column headers by adding rowDimentionsCount
      tbodyRows[i] = new Array(series[0].data.length + rowDimentionsCount);

      for (let j = 0; j < tbodyRows[i].length; j++) {
        if (j < rowDimentionsCount) {
          // Table row headings
          const hasColspan = this.hasColspan(i, colspanValues[j]);
          tbodyRows[i][j] = {
            colspan: hasColspan && colspanValues[j] > 1 ? colspanValues[j] : undefined,
            name: hasColspan ? this.getRowHeaderName(series[i], j) : undefined,
          };
        } else {
          // Table row data
          tbodyRows[i][j] = series[i].data[j - rowDimentionsCount].y;
        }
      }
    }
    console.log(tbodyRows);
    return tbodyRows;
  }

  private getColspanValues(rowDimentionsCount: number, series: FhiDiagramSerie[]): number[] {
    const colspanValues: number[] = [];
    for (let i = 0; i < rowDimentionsCount; i++) {
      const seriesMappedToNameOnly = series.map(
        (serie) => this.getNameArray(serie.name)[i],
      ) as string[];

      let previousName = '';
      seriesMappedToNameOnly.forEach((name, index) => {
        if (name !== previousName && !colspanValues[i]) {
          colspanValues[i] = index;
        }
        previousName = name;
      });
    }
    return colspanValues;
  }

  private hasColspan(rowIndex: number, colspanValue: number) {
    let isColspan = false;
    if (rowIndex === 0 || rowIndex % colspanValue === 0) {
      isColspan = true;
    }
    return isColspan;
  }

  private getRowHeaderName(serie: FhiDiagramSerie, j: number) {
    const nameArrayCurrent_i = this.getNameArray(serie.name);
    return nameArrayCurrent_i[j];
  }

  private getNameArray(name: string | string[]): string[] {
    if (typeof name === 'string') {
      const trimmedNames: string[] = [];
      name.split(Seperator.input).forEach((name) => {
        trimmedNames.push(name.trim());
      });
      return trimmedNames;
    }
    return name;
  }

  private getNumberOfRowDimentions(name: string | string[]): number {
    if (typeof name === 'string') {
      return name.split(Seperator.input).length;
    }
    return name.length;
  }
}
