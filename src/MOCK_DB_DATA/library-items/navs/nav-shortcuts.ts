import { LibraryItem } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemsSharedData as ITEMS } from '../library-items-shared-data';
import { LibraryItemGroupsSharedData as GROUPS } from '../library-item-groups-shared-data';
import { LibraryItemConstants as CONST } from '../library-item-constants';
import { ItemDependencyType, ItemType } from 'src/app/views/shared/item-type.enums';

export const NavShortcuts: LibraryItem[] = [
  {
    id: ITEMS.NavShortcuts.id,
    title: ITEMS.NavShortcuts.title,
    type: ItemType.html,
    exampleHtml: getExampleHtml(),
    codeHtml: getCodeHtml(),
    documentationHtml: getDocumentationHtml(),
    parent: GROUPS.Navs,
    dependencyType: ItemDependencyType.css,
  },
];

/*
 * Return value is ignored if LibraryItemType is not html
 */
function getExampleHtml(): string {
  return `
<a href="${CONST.voidURL}" class="btn fhi-btn-shortcut-link">
  <i class="icon-arrow-right"></i>
  <span class="btn__text">Snarvei-lenke</span>
</a>
<br>
<a href="${CONST.voidURL}" class="btn fhi-btn-shortcut-link">
  <i class="icon-arrow-left icon-red"></i>
  <span class="btn__text">Snarvei-lenke</span>
</a>`;
}

/*
 * Return empty string to use a copy of exampleHtml as codeHtml.
 * Return null to remove Code from library-item.
 */
function getCodeHtml(): string | null {
  return `
<a href="" class="btn fhi-btn-shortcut-link">
  <i class="icon-arrow-right"></i>
  <span class="btn__text">Snarvei-lenke</span>
</a>

<a href="" class="btn fhi-btn-shortcut-link">
  <i class="icon-arrow-left icon-red"></i>
  <span class="btn__text">Snarvei-lenke</span>
</a>`;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
  return null;
}
