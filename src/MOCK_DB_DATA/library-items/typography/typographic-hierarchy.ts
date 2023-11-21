import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemsSharedData as ITEMS } from '../library-items-shared-data';
import { LibraryItemConstants as CONST } from '../library-item-constants';

export const TypographicHierarchy: LibraryItem[] = [
  {
    id: ITEMS.VisualIdentityTypographyHierarchy.id,
    title: ITEMS.VisualIdentityTypographyHierarchy.title,
    titleLang: CONST.languageLocaleId_NO,
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
<p class="small"><code>.small</code> - liten tekst. Elementet <code>&lt;small&gt;</code> arver også denne fontstørrelseen.</p>
<p>Standard brødtekst. Css-klassen <code>.p</code> kan også benyttes.</p>
<p class="lead"><code>.lead</code> benyttes for ingress.</p>`;
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
