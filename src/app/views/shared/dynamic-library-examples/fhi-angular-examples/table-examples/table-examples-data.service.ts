import { Injectable } from "@angular/core";

@Injectable()
export class TableExamplesDataService {
  getNodes() {
    return {
      tableContent: [
        {
          col1: 1204,
          col2: 'Sigurd',
          col3: 'Bråten',
          col4: 'Designer',
          selected: false,
        },
        {
          col1: 203,
          col2: 'Henrik',
          col3: 'Olsen',
          col4: 'Assistant',
          selected: false,
        },
        {
          col1: 10000,
          col2: 'Elida',
          col3: 'Egge',
          col4: 'Producer',
          selected: false,
        },
      ]
    }
  }
}
