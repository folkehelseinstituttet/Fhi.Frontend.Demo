import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemsSharedData as ITEMS } from '../library-items-shared-data';
import { LibraryItemConstants as CONST } from '../library-item-constants';

const itemTitle = 'Modal';

export const Modal: LibraryItem[] = [
  {
    id: ITEMS.Modal.id,
    title: ITEMS.Modal.title,
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
<fhi-modal [modalTitle]="'Overskrift'">
  <ng-container fhi-modal.button>Åpne modal</ng-container>
  <ng-container fhi-modal.body><p>Modalvindu innhold.</p></ng-container>
</fhi-modal>`;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
  return null;
}
