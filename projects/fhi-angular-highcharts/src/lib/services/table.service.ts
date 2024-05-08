import { Injectable } from '@angular/core';

import { FhiDiagramSerie } from '../models/fhi-diagram-serie.model';
import { DiagramSerieNameSeperator as Seperator } from '../constants-and-enums/diagram-serie-name-seperator';
import { TableOrientationValues } from '../constants-and-enums/table-orientations';
import { TableCell, TableData } from '../models/table-data.model';

@Injectable()
export class TableService {
  getTable(series: FhiDiagramSerie[], orientation: string): TableData {
    if (orientation === TableOrientationValues.seriesAsColumns) {
      return {
        theadRows: this.getTableHeaderRows_OrientationColumns(series),
        tbodyRows: this.getTableBodyRows_OrientationColumns(series),
      };
    }
    return {
      theadRows: [this.getTableHeaderRow_OrientationRows(series)],
      tbodyRows: this.getTableBodyRows_OrientationRows(series),
    };
  }

  // -----------------------------
  //  Use series as table columns
  // -----------------------------

  private getTableHeaderRows_OrientationColumns(series: FhiDiagramSerie[]): TableCell[][] {
    const tableHeaderRows: TableCell[][] = [];
    const dimentionsCount = this.getSerieNameDimentionsCount(series[0].name);
    const colspanCounts = this.getColspanOrRowspanCounts(dimentionsCount, series);

    for (let i = 0; i < dimentionsCount; i++) {
      // Create extra table column for row headers by adding 1
      tableHeaderRows[i] = new Array(series.length + 1);

      for (let j = 0; j < tableHeaderRows[i].length; j++) {
        if (j > 0) {
          const hasColspan = this.hasColspan(j, colspanCounts[i]);
          tableHeaderRows[i][j] = {
            colspan: hasColspan ? colspanCounts[i] : undefined,
            name: hasColspan ? this.getColumnHeaderName(series[j - 1], i) : undefined,
            isHeading: true,
          };
        } else if (i === 0) {
          tableHeaderRows[i][j] = { isHeading: false, rowspan: dimentionsCount };
        }
      }
    }
    return tableHeaderRows;
  }

  private getTableBodyRows_OrientationColumns(series: FhiDiagramSerie[]): TableCell[][] {
    const tbodyRows = new Array<Array<TableCell>>(series[0].data.length);

    for (let i = 0; i < tbodyRows.length; i++) {
      // Create extra table column for row headers by adding 1
      tbodyRows[i] = new Array<TableCell>(series.length + 1);

      for (let j = 0; j < tbodyRows[i].length; j++) {
        if (j === 0) {
          // Table row headings
          tbodyRows[i][j] = {
            name: series[j].data[i].name,
            isHeading: true,
          };
        } else {
          // Table row data
          tbodyRows[i][j] = { isHeading: false, data: series[j - 1].data[i].y };
        }
      }
    }
    return tbodyRows;
  }

  private hasColspan(columnIndex: number, colspanValue: number): boolean {
    let isColspan = false;
    if (columnIndex === 1 || (columnIndex - 1) % colspanValue === 0) {
      isColspan = true;
    }
    return isColspan;
  }

  private getColumnHeaderName(serie: FhiDiagramSerie, rowIndex: number): string {
    return this.getSerieNameArray(serie.name)[rowIndex];
  }

  // --------------------------
  //  Use series as table rows
  // --------------------------

  private getTableHeaderRow_OrientationRows(series: FhiDiagramSerie[]): TableCell[] {
    const tableHeaderRow: TableCell[] = [];
    series[0].data.forEach((data, i) => {
      if (i === 0) {
        tableHeaderRow[i] = {
          isHeading: false,
          colspan: this.getSerieNameDimentionsCount(series[0].name),
        };
      }
      tableHeaderRow[i + 1] = { isHeading: true, name: data.name };
    });
    return tableHeaderRow;
  }

  private getTableBodyRows_OrientationRows(series: FhiDiagramSerie[]): TableCell[][] {
    const dimentionsCount = this.getSerieNameDimentionsCount(series[0].name);
    const rowspanCounts = this.getColspanOrRowspanCounts(dimentionsCount, series);
    const tbodyRows = new Array<Array<TableCell>>(series.length);

    for (let i = 0; i < series.length; i++) {
      // Create extra table columns for row headers by adding "SerieNameDimentionsCount"
      tbodyRows[i] = new Array(series[0].data.length + dimentionsCount);

      for (let j = 0; j < tbodyRows[i].length; j++) {
        if (j < dimentionsCount) {
          // Table row headings
          const hasRowspan = this.hasRowspan(i, rowspanCounts[j]);
          tbodyRows[i][j] = {
            rowspan: hasRowspan && rowspanCounts[j] > 1 ? rowspanCounts[j] : undefined,
            name: hasRowspan ? this.getRowHeaderName(series[i], j) : undefined,
            isHeading: true,
          };
        } else {
          // Table row data
          tbodyRows[i][j] = { isHeading: false, data: series[i].data[j - dimentionsCount].y };
        }
      }
    }
    return tbodyRows;
  }

  private hasRowspan(rowIndex: number, rowspanValue: number): boolean {
    let isRowspan = false;
    if (rowIndex === 0 || rowIndex % rowspanValue === 0) {
      isRowspan = true;
    }
    return isRowspan;
  }

  private getRowHeaderName(serie: FhiDiagramSerie, coloumIndex: number): string {
    return this.getSerieNameArray(serie.name)[coloumIndex];
  }

  // ------------------------------
  //  Shared for both orientations
  // ------------------------------

  private getSerieNameArray(name: string | string[]): string[] {
    if (typeof name === 'string') {
      const trimmedNames: string[] = [];
      name.split(Seperator.input).forEach((name) => {
        trimmedNames.push(name.trim());
      });
      return trimmedNames;
    }
    return name;
  }

  private getSerieNameDimentionsCount(name: string | string[]): number {
    if (typeof name === 'string') {
      return name.split(Seperator.input).length;
    }
    return name.length;
  }

  private getColspanOrRowspanCounts(dimentionsCount: number, series: FhiDiagramSerie[]): number[] {
    const counts: number[] = [];
    let previousCount: number;

    for (let i = 0; i < dimentionsCount; i++) {
      const names = series.map((serie) => this.getSerieNameArray(serie.name)[i]) as string[];
      const uniqueNameCount = new Set(names).size;
      let count: number;

      if (!previousCount) {
        count = names.length / uniqueNameCount;
      } else {
        count = previousCount / uniqueNameCount;
      }

      this.testIfNamesContainsDuplicates(count);

      counts.push(count);
      previousCount = count;
    }
    return counts;
  }

  // TODO: update API-doc with the same information

  private testIfNamesContainsDuplicates(count: number) {
    if (!Number.isInteger(count)) {
      throw new Error(`Diagram type Table doesn't support duplicate names within a dimention.`);
    }
  }
}
