import { Injectable } from "@angular/core";

@Injectable()
export class TableExamplesDataService {
  table1() {
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
          col4: 'Assistent',
          selected: false,
        },
        {
          col1: 2668,
          col2: 'Karl Julius',
          col3: 'Granli',
          col4: 'Kaffemakerassistentreserve',
          selected: false,
        },
        {
          col1: 1234,
          col2: 'Kristoffer Benjamin',
          col3: 'Bang-Larssen Severiniussen',
          col4: 'Fotograf og Regissør',
          selected: false,
        },
        {
          col1: 10000,
          col2: 'Elida',
          col3: 'Egge',
          col4: 'Produsent',
          selected: false,
        },
      ]
    }
  };

  tableEditable() {
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
          col4: 'Assistent',
          selected: false,
        },
        {
          col1: 2668,
          col2: 'Karl Julius',
          col3: 'Granli',
          col4: 'Kaffemakerassistentreserve',
          selected: false,
        },
        {
          col1: 1234,
          col2: 'Kristoffer Benjamin',
          col3: 'Bang-Larssen Severiniussen',
          col4: 'Fotograf og Regissør',
          selected: false,
        },
        {
          col1: 10000,
          col2: 'Elida',
          col3: 'Egge',
          col4: 'Produsent',
          selected: false,
        },
      ]
    }
  };
}
