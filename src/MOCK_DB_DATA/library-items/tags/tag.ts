import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemsSharedData as ITEMS } from '../library-items-shared-data';
import { LibraryItemConstants as CONST } from '../library-item-constants';

export const Tag: LibraryItem[] = [
  {
    id: ITEMS.Tag.id,
    title: ITEMS.Tag.title,
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
<p>
  <a href="javascript:void(0)" class="fhi-tag fhi-tag--category">Kategorinavn</a>
</p>
<p>
  <a href="javascript:void(0)" class="fhi-tag fhi-tag--category">
    <i class="icon-arrow-left"></i>
    Kategorinavn
  </a>
</p>
<p class="mb-0">
  <span class="fhi-tag fhi-tag--category">Kategorinavn uten lenke</span>
</p>`;
}

/*
 * Return empty string to use a copy of exampleHtml as codeHtml.
 * Return null to remove Code from library-item.
 */
function getCodeHtml(): string | null {
  return `
<a href="/url" class="fhi-tag fhi-tag--category">Kategorinavn</a>

<a href="/url" class="fhi-tag fhi-tag--category">
  <i class="icon-arrow-left"></i>
  Kategorinavn
</a>

<span class="fhi-tag fhi-tag--category">Kategori uten lenke</span>`;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
  return null;
}
