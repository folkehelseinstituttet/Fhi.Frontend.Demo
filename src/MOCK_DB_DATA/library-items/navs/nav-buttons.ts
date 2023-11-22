import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemsSharedData as ITEMS } from '../library-items-shared-data';
import { LibraryItemConstants as CONST } from '../library-item-constants';

export const NavButtons: LibraryItem[] = [
  {
    id: ITEMS.NavButtons.id,
    title: ITEMS.NavButtons.title,
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
<div class="row mb-4">
  <div class="col-auto">
    <a href="${CONST.voidURL}" class="btn fhi-btn-menu-item">
      <i class="icon-population"></i>
      <span class="btn__text">Med ikon</span>
    </a>
  </div>
  <div class="col-auto">
    <a href="${CONST.voidURL}" class="btn fhi-btn-menu-item">
      <span class="btn__text">Uten ikon</span>
    </a>
  </div>
</div>
<p>
  <a href="${CONST.voidURL}" class="btn fhi-btn-menu-item fhi-btn-menu-item--active">
    <i class="icon-muscle"></i>
    <span class="btn__text">Aktivt menyelement</span>
  </a>
</p>`;
}

/*
 * Return empty string to use a copy of exampleHtml as codeHtml.
 * Return null to remove Code from library-item.
 */
function getCodeHtml(): string | null {
  return `
<a href="#" class="btn fhi-btn-menu-item">
  <i class="icon-[name]"></i>
  <span class="btn__text">Med ikon</span>
</a>

<a href="#" class="btn fhi-btn-menu-item">
  <span class="btn__text">Uten ikon</span>
</a>

<a href="#" class="btn fhi-btn-menu-item fhi-btn-menu-item--active">
  <i class="icon-[name]"></i>
  <span class="btn__text">Aktivt menyelement</span>
</a>`;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
  return null;
}
