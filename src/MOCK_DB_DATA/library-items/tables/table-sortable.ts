import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemsSharedData as ITEMS } from '../library-items-shared-data';
import { LibraryItemConstants as CONST } from '../library-item-constants';

export const TableSortable: LibraryItem[] = [
  {
    id: ITEMS.TableSortable.id,
    title: ITEMS.TableSortable.title,
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
  return ``;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
  return `
<div class="alert alert-info" role="alert">
  <i class="icon-info-circle"></i>
  <p class="mb-0">FHI Angular Components vil på sikt inkludere en tabellkomponent.</p>
</div>

<p>Se <a href="${CONST.ExampleComponentsGithubUrl}/tables">kode på Github for disse eksemplene</a>.</p>`;
}
