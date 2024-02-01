import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemsSharedData as ITEMS } from '../library-items-shared-data';
import { LibraryItemConstants as CONST } from '../library-item-constants';

export const TableStriped: LibraryItem[] = [
  {
    id: ITEMS.TableStriped.id,
    title: ITEMS.TableStriped.title,
    type: LibraryItemType.angular,
    exampleHtml: getExampleHtml(),
    codeHtml: getCodeHtml(),
    documentationHtml: getDocumentationHtml(),
  },
];

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
        <td></td>
        <th>Kolonne 1</th>
        <th>Kolonne 2</th>
        <th>Kolonne 3</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>Rad 1</th>
        <td>Celle 1</td>
        <td>Celle 2</td>
        <td>Celle 3</td>
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
