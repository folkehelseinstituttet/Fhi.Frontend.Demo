import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemsSharedData as ITEMS } from '../library-items-shared-data';

export const LayoutBase: LibraryItem[] = [
  {
    id: ITEMS.LayoutBase.id,
    title: ITEMS.LayoutBase.title,
    type: LibraryItemType.angular,
    exampleHtml: getExampleHtml(),
    codeHtml: getCodeHtml(),
    documentationHtml: getDocumentationHtml(),
    fullScreenEnabled: true,
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
<fhi-layout>
  <ng-container maincontent.title>
    {{ Sidens tittel }}
  </ng-container>

  <ng-container maincontent.maincontent>
    Sidens innhold
  </ng-container>
</fhi-layout>`;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
  return null;
}
