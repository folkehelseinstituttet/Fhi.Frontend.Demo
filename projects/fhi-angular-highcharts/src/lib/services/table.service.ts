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

    // TODO: colspanValues -> colspanCounts
    const colspanValues = this.getColspanOrRowspanCounts(dimentionsCount, series);

    for (let i = 0; i < dimentionsCount; i++) {
      // Create extra table column for row headers by adding 1
      tableHeaderRows[i] = new Array(series.length + 1);

      for (let j = 0; j < tableHeaderRows[i].length; j++) {
        if (j > 0) {
          const hasColspan = this.hasColspan(j, colspanValues[i]);
          tableHeaderRows[i][j] = {
            colspan: hasColspan ? colspanValues[i] : undefined,
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

    // TODO: rowspanValues -> rowspanCounts
    const rowspanValues = this.getColspanOrRowspanCounts(dimentionsCount, series);
    const tbodyRows = new Array<Array<TableCell>>(series.length);

    for (let i = 0; i < series.length; i++) {
      // Create extra table columns for row headers by adding "SerieNameDimentionsCount"
      tbodyRows[i] = new Array(series[0].data.length + dimentionsCount);

      for (let j = 0; j < tbodyRows[i].length; j++) {
        if (j < dimentionsCount) {
          // Table row headings
          const hasRowspan = this.hasRowspan(i, rowspanValues[j]);
          tbodyRows[i][j] = {
            rowspan: hasRowspan && rowspanValues[j] > 1 ? rowspanValues[j] : undefined,
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

  private getColspanOrRowspanValues(dimentionsCount: number, series: FhiDiagramSerie[]): number[] {
    const values: number[] = [];
    for (let i = 0; i < dimentionsCount; i++) {
      const seriesMappedToNameOnly = series.map(
        (serie) => this.getSerieNameArray(serie.name)[i],
      ) as string[];

      console.log('seriesMappedToNameOnly', seriesMappedToNameOnly);

      // let previousName = undefined;
      // let valueIsFound = false;

      const counts = {};
      seriesMappedToNameOnly.forEach((name, index) => {
        console.log('name', name);

        // If the value is encountered for the first time, set the count to 1
        if (!counts[name]) {
          counts[name] = 1;
        } else {
          // If the value has been seen before, increment the count
          counts[name]++;
        }
        // if (!valueIsFound) {
        //   values[i] = index;
        // }
        // if (previousName !== name && index > 0) {
        //   valueIsFound = true;
        // }
        // previousName = name;
      });
      console.log('counts', counts);
      // values[i] =
    }
    console.log('values', values);

    // return [3, 1, 1];
    return values;
  }

  // private getColspanOrRowspanCounts(dimentionsCount: number, series: FhiDiagramSerie[]): number[] {
  //   const counts: number[] = [];
  //   let previousUniqueCount: number;

  //   for (let i = 0; i < dimentionsCount; i++) {
  //     const names = series.map((serie) => this.getSerieNameArray(serie.name)[i]) as string[];

  //     console.log('names', names);

  //     const occurrenceCount = this.getOccurrenceCount(names, names[0]);
  //     const uniqueCount = this.getUniqueCount(names);
  //     console.log('occurrenceCount', occurrenceCount);
  //     console.log('uniqueCount', uniqueCount);

  //     if (i === 0) {
  //       counts.push(occurrenceCount);
  //     } else if (i < dimentionsCount - 1) {
  //       counts.push(occurrenceCount / previousUniqueCount);
  //     } else {
  //       counts.push(1);
  //     }
  //     previousUniqueCount = uniqueCount;
  //   }
  //   console.log('counts', counts);
  //   return counts;
  // }

  private getOccurrenceCount(array: string[], value: string) {
    return array.filter((v) => v === value).length;
  }

  private getUniqueCount(array: string[]) {
    return new Set(array).size;
  }

  private getColspanOrRowspanCounts(dimentionsCount: number, series: FhiDiagramSerie[]): number[] {
    const counts: number[] = [];
    let previousUniqueCount: number;

    for (let i = 0; i < dimentionsCount; i++) {
      const names = series.map((serie) => this.getSerieNameArray(serie.name)[i]) as string[];
      const occurrenceCount = names.filter((name) => name === names[0]).length;
      const uniqueCount = new Set(names).size;

      if (i === 0) {
        counts.push(occurrenceCount);
      } else if (i < dimentionsCount - 1) {
        counts.push(occurrenceCount / previousUniqueCount);
      } else {
        counts.push(1);
      }
      previousUniqueCount = uniqueCount;
    }
    return counts;
  }
}
