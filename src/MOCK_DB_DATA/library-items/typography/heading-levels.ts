import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemsSharedData as ITEMS } from '../library-items-shared-data';
import { LibraryItemConstants as CONST } from '../library-item-constants';

export const HeadingLevels: LibraryItem[] = [
  {
    id: ITEMS.VisualIdentityHeadingLevels.id,
    title: ITEMS.VisualIdentityHeadingLevels.title,
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
<h1>Overskriftsnivå 1</h1>
<h2>Overskriftsnivå 2</h1>
<h3>Overskriftsnivå 3</h1>
<h4>Overskriftsnivå 4</h1>
<h5>Overskriftsnivå 5</h1>`;
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
