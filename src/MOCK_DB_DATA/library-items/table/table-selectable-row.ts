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
<div class="responsive-table">
  <table class="table table-striped">
    <thead>
      <tr>
        <th>
          <input class="form-check-input" id="selectAllRows" type="checkbox" (change)="toggleAll($event)"/>
          <label for="selectAllRows" class="visually-hidden">Velg alle rader</label>
        </th>
        <th scope="col"
            tabindex="0"
            aria-label="Sorter tabell på ID"
            [attr.aria-sort]="(currentlySortedColumn === 'col1' ? sortDirection : 'none')"
            (click)="sortTable('col1')">
          <span class="text-decoration-underline">ID</span>
          <i [ngClass]="getIconClass('col1')"></i>
        </th>
        <th scope="col"
            tabindex="0"
            aria-label="Sorter tabell på fornavn"
            [attr.aria-sort]="(currentlySortedColumn === 'col2' ? sortDirection : 'none')"
            (click)="sortTable('col2')">
          <span class="text-decoration-underline">Fornavn</span>
          <i [ngClass]="getIconClass('col2')"></i>
        </th>
        <th scope="col"
            tabindex="0"
            aria-label="Sorter tabell på etternavn"
            [attr.aria-sort]="(currentlySortedColumn === 'col3' ? sortDirection : 'none')"
            (click)="sortTable('col3')">
          <span class="text-decoration-underline">Etternavn</span>
          <i [ngClass]="getIconClass('col3')"></i>
        </th>
        <th scope="col"
            tabindex="0"
            aria-label="Sorter tabell på rolle"
            [attr.aria-sort]="(currentlySortedColumn === 'col4' ? sortDirection : 'none')"
            (click)="sortTable('col4')">
          <span class="text-decoration-underline">Rolle</span>
          <i [ngClass]="getIconClass('col4')"></i>
        </th>
      </tr>
    </thead>

    <tbody>
      <tr *ngFor="let tableRow of data.tableContent; index as i" [attr.aria-selected]="tableRow.selected">
        <td>
          <input class="form-check-input"
                 id="row{{i}}"
                 type="checkbox"
                 [checked]="tableRow.selected"
                 (change)="tableRow.selected = !tableRow.selected" />
          <label for="row{{i}}" class="visually-hidden">Velg denne raden</label>
        </td>
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
