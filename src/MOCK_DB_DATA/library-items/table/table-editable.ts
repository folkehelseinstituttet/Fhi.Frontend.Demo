import { LibraryItemIds } from '../library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';

export const TableEditable: LibraryItem[] = [{
  id: LibraryItemIds.TableEditable,
  title: 'Table - inline editable',
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
  <table class="table">
    <thead>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Fornavn</th>
        <th scope="col">Etternavn</th>
        <th scope="col">Rolle</th>
        <th class="text-end" scope="col">Handling</th>
      </tr>
    </thead>

    <tbody>
      <tr class="table-hover-row" *ngFor="let tableRow of tableEditable.tableContent; index as i">
        <th>{{ tableRow.col1 }}</th>
        <td>{{ tableRow.col2 }}</td>
        <td>{{ tableRow.col3 }}</td>
        <td class="py-1">
          <span contentEditable="true">{{ tableRow.col4 }}</span>
        </td>
        <td class="text-end py-0 align-middle">
          <button class="btn fhi-btn-icon"
                  type="button"
                  (click)="deleteRow(tableRow.col1, i)">
            <i class="icon-trash-can"></i><span class="btn__text">Slett</span>
          </button>
        </td>
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
