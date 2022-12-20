import { LibraryItemIds } from '../library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';

export const TableSelectableRow: LibraryItem[] = [{
  id: LibraryItemIds.TableSelectableRow,
  title: 'Table - selectable row',
  type: LibraryItemType.fhiAngular,
  exampleHtml: getExampleHtml(),
  codeHtml: getCodeHtml(),
  documentationHtml: getDocumentationHtml()
}];


/*
 * Return value is ignored if LibraryItemType is not html
 */
function getExampleHtml(): string {
  return ``;
}

/*
 * Return empty string to use a copy of exampleHtml as codeHtml.
 * Return null to remove Code from library-item.
 */
function getCodeHtml(): string | null {
  return `
<div class="table-responsive">
  <table class="table table-striped">
    <thead>
      <tr>
        <th scope="col">
          <input class="form-check-input" id="selectAllRows" type="checkbox" />
          <label for="selectAllRows" class="visually-hidden">Velg alle rader</label>
        </th>
        <th scope="col" tabindex="0" aria-sort="ascending" aria-label="Sorter tabellen basert på Fornavn, synkende">
          <span class="text-decoration-underline">Fornavn</span>
          <i class="icon-chevron-up"></i>
        </th>
        <th scope="col" tabindex="0" aria-sort="none" aria-label="Sorter tabellen basert på Etternavn, stigende">
          <span class="text-decoration-underline">Etternavn</span>
          <i class="icon-chevron-expand"></i>
        </th>
        <th scope="col" tabindex="0" aria-sort="none" aria-label="Sorter tabellen basert på Rolle, stigende">
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
        <td>Assistant</td>
      </tr>
      <tr>
        <th>
          <input class="form-check-input" id="row4" type="checkbox" />
          <label for="row4" class="visually-hidden">Velg denne raden</label>
        </th>
        <td>Marie</td>
        <td>Mul</td>
        <td>Director</td>
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
        <td>Assistant</td>
      </tr>
      <tr>
        <th>
          <input class="form-check-input" id="row5" type="checkbox" />
          <label for="row5" class="visually-hidden">Velg denne raden</label>
        </th>
        <td>Vegard</td>
        <td>Bugge-Berntsen</td>
        <td>Light</td>
      </tr>
    </tbody>
  </table>
</div>`;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
  return null;
}
