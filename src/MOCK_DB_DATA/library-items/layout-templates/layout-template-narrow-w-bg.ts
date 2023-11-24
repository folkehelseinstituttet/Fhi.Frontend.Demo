import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemsSharedData as ITEMS } from '../library-items-shared-data';

export const LayoutTemplateNarrowWBg: LibraryItem[] = [
  {
    id: ITEMS.LayoutTemplateNarrowWBg.id,
    title: ITEMS.LayoutTemplateNarrowWBg.title,
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
<fhi-layout-narrow-w-bg>
  <ng-container maincontent.title>
    {{ Sidens tittel }}
  </ng-container>

  <ng-container maincontent.maincontent>
    Sidens innhold
  </ng-container>
</fhi-layout-narrow-w-bg>`;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
  return null;
}
