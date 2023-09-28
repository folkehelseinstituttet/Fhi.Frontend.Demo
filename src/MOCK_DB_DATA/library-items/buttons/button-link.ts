import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemsSharedData as ITEMS } from '../library-items-shared-data';

<<<<<<<< HEAD:src/MOCK_DB_DATA/library-items/buttons/button-link.ts
export const ButtonLink: LibraryItem[] = [{
  id: ITEMS.ButtonLink.id,
  title: ITEMS.ButtonLink.title,
========
export const ButtonFlat: LibraryItem[] = [{
  id: ITEMS.ButtonFlat.id,
  title: ITEMS.ButtonFlat.title,
>>>>>>>> enhancement/new-system--form-controls--tmp:src/MOCK_DB_DATA/library-items/buttons/button-flat.ts
  type: LibraryItemType.html,
  exampleHtml: getExampleHtml(),
  codeHtml: getCodeHtml(),
  documentationHtml: getDocumentationHtml()
}];


/*
 * Return value is ignored if LibraryItemType is not html
 */
function getExampleHtml(): string {
  return `
<button type="button" class="btn fhi-btn-link">
  Knapp som ser ut som en lenke
</button>`;
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
  return null;
}
