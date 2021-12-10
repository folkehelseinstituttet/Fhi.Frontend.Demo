import { LibraryExample } from 'src/app/shared/models/library-example.model';
import { LibraryMenuLevel2Categories } from 'src/app/_common/constants/library-menu-level-2-categories';

const categoryNames = LibraryMenuLevel2Categories.cssComponentCategories;

export const TableSelectableRow: LibraryExample[] = [{
  title: 'Tabell - selekterbar rad',
  exampleHtml: `
<p>(Example is just showing visuals for current state, there's no toggle functionality here.)</p>

<div class="table-responsive">
  <table class="table table-striped" data-sort-column="2">
    <thead>
      <tr>
        <th scope="col">
          <input class="form-check-input" id="selectAllRows" type="checkbox" />
          <label for="selectAllRows" class="visually-hidden">Velg alle rader</label>
        </th>
        <th scope="col" tabindex="0" aria-sort="ascending" aria-label="Sorter tabellen synkende basert på Fornavn">
          <span class="text-decoration-underline">Fornavn</span>
          <i class="icon-chevron-up"></i>
        </th>
        <th scope="col" tabindex="0" aria-sort="none" aria-label="Sorter tabellen stigende basert på Etternavn">
          <span class="text-decoration-underline">Etternavn</span>
          <i class="icon-chevron-expand"></i>
        </th>
        <th scope="col" tabindex="0" aria-sort="none" aria-label="Sorter tabellen stigende basert på Rolle">
          <span class="text-decoration-underline">Rolle</span>
          <i class="icon-chevron-expand"></i>
        </th>
      </tr>
    </thead>

    <tbody>
      <tr>
        <th>
          <input class="form-check-input" id="row1" type="checkbox" />
          <label for="row1" class="visually-hidden">Velg denne raden</label>
        </th>
        <td>Elida</td>
        <td>Egge</td>
        <td>Producer</td>
      </tr>
      <tr aria-selected="true">
        <th>
          <input class="form-check-input" id="row2" type="checkbox" checked />
          <label for="row2" class="visually-hidden">Velg denne raden</label>
        </th>
        <td>Elisabeth</td>
        <td>Kristiansen</td>
        <td>Script</td>
      </tr>
      <tr aria-selected="true">
        <th>
          <input class="form-check-input" id="row3" type="checkbox" checked />
          <label for="row3" class="visually-hidden">Velg denne raden</label>
        </th>
        <td>Henrik</td>
        <td>Olsen</td>
        <td>Assistent</td>
      </tr>
      <tr>
        <th>
          <input class="form-check-input" id="row4" type="checkbox" />
          <label for="row4" class="visually-hidden">Velg denne raden</label>
        </th>
        <td>Marie</td>
        <td>Mul</td>
        <td>Regissør</td>
      </tr>
      <tr>
        <th>
          <input class="form-check-input" id="row5" type="checkbox" />
          <label for="row5" class="visually-hidden">Velg denne raden</label>
        </th>
        <td>Sigurd</td>
        <td>Bråten</td>
        <td>Designer</td>
      </tr>
      <tr>
        <th>
          <input class="form-check-input" id="row5" type="checkbox" />
          <label for="row5" class="visually-hidden">Velg denne raden</label>
        </th>
        <td>Tore</td>
        <td>Gudmundsen</td>
        <td>Assistent</td>
      </tr>
      <tr>
        <th>
          <input class="form-check-input" id="row5" type="checkbox" />
          <label for="row5" class="visually-hidden">Velg denne raden</label>
        </th>
        <td>Vegard</td>
        <td>Bugge-Berntsen</td>
        <td>Lys</td>
      </tr>
    </tbody>
  </table>
</div>
`,
  category: categoryNames.tables
}];
