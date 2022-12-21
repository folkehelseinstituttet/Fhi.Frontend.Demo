import { LibraryItemIds } from '../library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';

export const TableSortable: LibraryItem[] = [{
  id: LibraryItemIds.TableSortable,
  title: 'Table - sortable',
  type: LibraryItemType.fhiAngular,
  exampleHtml: getExampleHtml(),
  codeHtml: getCodeHtml(),
  documentationHtml: getDocumentationHtml(),
  fullScreenEnabled: true
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
        <th scope="col"
            tabindex="0"
            aria-label="Sorter tabell på ID"
            [attr.aria-sort]="(currentlySortedColumn === 'col1' ? sortDirection : 'none')"
            (keydown.enter)="sortTable('col1')"
            (click)="sortTable('col1')">
          <span class="text-decoration-underline">ID</span>
          <i [ngClass]="getIconClass('col1')"></i>
        </th>
        <th scope="col"
            tabindex="0"
            aria-label="Sorter tabell på fornavn"
            [attr.aria-sort]="(currentlySortedColumn === 'col2' ? sortDirection : 'none')"
            (keydown.enter)="sortTable('col2')"
            (click)="sortTable('col2')">
          <span class="text-decoration-underline">Fornavn</span>
          <i [ngClass]="getIconClass('col2')"></i>
        </th>
        <th scope="col"
            tabindex="0"
            aria-label="Sorter tabell på etternavn"
            [attr.aria-sort]="(currentlySortedColumn === 'col3' ? sortDirection : 'none')"
            (keydown.enter)="sortTable('col3')"
            (click)="sortTable('col3')">
          <span class="text-decoration-underline">Etternavn</span>
          <i [ngClass]="getIconClass('col3')"></i>
        </th>
        <th scope="col"
            tabindex="0"
            aria-label="Sorter tabell på rolle"
            [attr.aria-sort]="(currentlySortedColumn === 'col4' ? sortDirection : 'none')"
            (keydown.enter)="sortTable('col4')"
            (click)="sortTable('col4')">
          <span class="text-decoration-underline">Rolle</span>
          <i [ngClass]="getIconClass('col4')"></i>
        </th>
      </tr>
    </thead>

    <tbody>
      <tr *ngFor="let tableRow of data.tableContent">
        <th>{{ tableRow.col1 }}</th>
        <td>{{ tableRow.col2 }}</td>
        <td>{{ tableRow.col3 }}</td>
        <td>{{ tableRow.col4 }}</td>
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
