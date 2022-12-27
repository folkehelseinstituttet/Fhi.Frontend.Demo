import { Injectable } from "@angular/core";

@Injectable()
export class TableWithExpandableContentDataService {
  tableData() {
    return {
      tableContent: [
        {
          col1: 'Sigurd',
          col2: 'Bråten',
          col3: 'Designer',
          extended: `<p>Tilleggsdata</p>

          <ul>
            <li>Dette kan være</li>
            <li>hva som helst</li>
          </ul>

          <h2 class="h5">Her er en advarsel:</h2>
          <div class="alert alert-warning">
            <i class="icon-info-circle"></i>
            Advarsel!
          </div>`,
        },
        {
          col1: 'Henrik',
          col2: 'Olsen',
          col3: 'Assistent',
          extended: 'Tilleggsdata',
        },
        {
          col1: 'Karl Julius',
          col2: 'Granli',
          col3: 'Kaffemakerassistentreserve',
          extended: 'Tilleggsdata',
        },
        {
          col1: 'Kristoffer Benjamin',
          col2: 'Bang-Larssen Severiniussen',
          col3: 'Fotograf og Regissør',
          extended: 'Tilleggsdata',
        },
        {
          col1: 'Elida',
          col2: 'Egge',
          col3: 'Produsent',
          extended: 'Tilleggsdata',
        },
      ]
    }
  };
}
