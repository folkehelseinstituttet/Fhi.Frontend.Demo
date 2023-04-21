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

      newTableHeaderRows[j] = new Array(series.length + 1); // + 1 = Label column
      newTableHeaderRows[0][0] = {
        rowspan: tmpHeaderRow[1].split(',').length
      };
      newTableHeaderRows[j][0] = undefined;

      for (let i = 0; i < tmpHeaderRow.length; i++) {

        const isFirstColumn = i === 0;
        const splitHeader = tmpHeaderRow[i].split(',');


        // Alle runder unntatt den siste: må finne et modulo utrykk som blir riktig i alle runder
        let modulo: number = 0; //(i % splitHeader.length)

        if (!isLastRow && !isFirstColumn && modulo === 0) {
          newTableHeaderRows[j][i] = {
            name: splitHeader[j]
          //   colspan: (() => {
          //     if (tmpHeaderRow[j + 1] === undefined) {
          //       return;
          //     }
          //     newTableHeaderRows[j + 1].forEach(i => {
          //       console.log('i', i);
          //     });
          //     return 1
          //   })()
          };
        }
        // if (newTableHeaderRows[j - 1] !== undefined) {
        //   // typeof newTableHeaderRows[j - 1][i] === 'object'
        //   // console.log('newTableHeaderRows[j - 1][i]', newTableHeaderRows[j - 1][i]);
        //   // console.log('newTableHeaderRows[j - 1]', newTableHeaderRows[j - 1]);
        //   // newTableHeaderRows[j - 1][i].colespan = 2
        // }

        // Siste runde: Alle skal med, ingen clospan
        if (isLastRow) {
          newTableHeaderRows[j][i] = {
            name: splitHeader[j]
          };
        }

      } // end for i
    } // end for j


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
