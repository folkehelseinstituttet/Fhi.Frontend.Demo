import { Injectable } from '@angular/core';

import { FhiDiagramSerie } from '../models/fhi-diagram-serie.model';
import { DiagramSerieNameSeperator as Seperator } from '../constants-and-enums/diagram-serie-name-seperator';

interface TableHeaderCell {
  name?: string | undefined;
  colspan?: number;
  rowspan?: number;
}
interface TableCell {
  isHeading: boolean;
  data?: string | number;
  name?: string | undefined;
  colspan?: number;
  rowspan?: number;
}
interface TableData {
  theadRows: TableCell[][];
  tbodyRows: TableCell[][];
}

@Injectable()
export class TableService {
  getTable(series: FhiDiagramSerie[], orientation: string): TableData {
    if (orientation === 'plot the rows of data on the x-axis') {
      return {
        theadRows: [this.getTableHeaderRow_OrientationIsRows(series)],
        tbodyRows: this.getTableBodyRows_OrientationIsRows(series),
      };
    }
    return {
      theadRows: this.getTableHeaderRows_OrientationIsColumns(series),
      tbodyRows: this.getTableBodyRows_OrientationIsColumns(series),
    };
  }

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
  //    OLD TABLE ORIENTATION
  // ----------------------------

  private getTableHeaderRows_OrientationIsColumns(series: FhiDiagramSerie[]): TableCell[][] {
    const seriesMappedToNameOnly = series.map((serie) => serie.name) as string[];
    const tableHeaderRowCount = seriesMappedToNameOnly[0].split(Seperator.output).length;
    const tableHeaderRows: TableCell[][] = new Array(tableHeaderRowCount);

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

  private getTableBodyRows_OrientationIsColumns(series: FhiDiagramSerie[]): string[][] {
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

  private getTableHeaderRow_OrientationIsRows(series: FhiDiagramSerie[]): TableCell[] {
    const tableHeaderRow: TableCell[] = [];
    series[0].data.forEach((data, index) => {
      if (index === 0) {
        tableHeaderRow.push({
          isHeading: false,
          colspan: this.getNumberOfRowDimentions(series[0].name),
          name: undefined,
        });
      }
      tableHeaderRow.push({ isHeading: true, colspan: undefined, name: data.name });
    });
    console.log(tableHeaderRow);
    return tableHeaderRow;
  }

  private getTableBodyRows_OrientationIsRows(series: FhiDiagramSerie[]): TableCell[][] {
    const rowDimentionsCount = this.getNumberOfRowDimentions(series[0].name);
    const colspanValues = this.getColspanValues(rowDimentionsCount, series);
    const tbodyRows = new Array<Array<TableCell>>(series.length);

    for (let i = 0; i < tbodyRows.length; i++) {
      // Create extra table columns for column headers by adding rowDimentionsCount
      tbodyRows[i] = new Array(series[0].data.length + rowDimentionsCount);

      for (let j = 0; j < tbodyRows[i].length; j++) {
        if (j < rowDimentionsCount) {
          // Table row headings
          const hasColspan = this.hasColspan(i, colspanValues[j]);
          tbodyRows[i][j] = {
            rowspan: hasColspan && colspanValues[j] > 1 ? colspanValues[j] : undefined,
            name: hasColspan ? this.getRowHeaderName(series[i], j) : undefined,
            isHeading: true,
          };
        } else {
          // Table row data
          tbodyRows[i][j] = { isHeading: false, data: series[i].data[j - rowDimentionsCount].y };
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
