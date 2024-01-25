import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemsSharedData as ITEMS } from '../library-items-shared-data';
import { LibraryItemConstants as CONST } from '../library-item-constants';

export const TableRowspan: LibraryItem[] = [
  {
    id: ITEMS.TableRowspan.id,
    title: ITEMS.TableRowspan.title,
    type: LibraryItemType.html,
    exampleHtml: getExampleHtml(),
    codeHtml: getCodeHtml(),
    documentationHtml: getDocumentationHtml(),
  },
];

/*
 * Return value is ignored if LibraryItemType is not html
 */
function getExampleHtml(): string {
  return `
<div class="table-responsive">
  <table class="table">
    <thead>
      <tr>
        <th scope="col">Adresse</th>
        <th scope="col">Etternavn</th>
        <th scope="col">Fornavn</th>
        <th scope="col">Hobby</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th rowspan="3">Gate 1</th>
        <td rowspan="2">Hansen</td>
        <td>Birger Henrik</td>
        <td>Sykle</td>
      </tr>
      <tr>
        <td>Sigurd</td>
        <td>Rake</td>
      </tr>
      <tr>
        <td>Olsen</td>
        <td>Elida</td>
        <td>Fotball</td>
      </tr>
      <tr>
        <th rowspan="2">Gate 2</th>
        <td rowspan="2">Jensen</td>
        <td>Marie</td>
        <td rowspan="2">Hest</td>
      </tr>
      <tr>
        <td>Elisabeth</td>
      </tr>
    </tbody>
  </table>
</div>`;
}

/*
 * Return empty string to use a copy of exampleHtml as codeHtml.
 * Return null to remove Code from library-item.
 */
function getCodeHtml(): string | null {
  return `
<div class="table-responsive">
  <table class="table">
    <thead>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Fornavn</th>
        <th scope="col">Etternavn</th>
        <th scope="col">Rolle</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>1202</th>
        <td>Birger Henrik</td>
        <td>Tybring-Gjedde Olssen</td>
        <td>Assistant</td>
      </tr>
    </tbody>
  </table>
</div>`;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
  return `
<p>Tabell benyttes når du har behov for å presentere tabulære data.</p>

<p>I FHI Designsystem er grunn-tabellene bygget som <a href="${CONST.BootstrapBaseUrl}/content/tables/">Bootstrap-tabell</a>.</p>`;
}
