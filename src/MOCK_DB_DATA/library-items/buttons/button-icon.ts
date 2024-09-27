import { LibraryItem } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemsSharedData as ITEMS } from '../library-items-shared-data';
import { LibraryItemGroupsSharedData as GROUPS } from '../library-item-groups-shared-data';
import { ItemDependencyType, ItemType } from 'src/app/views/shared/item-type.enums';

export const ButtonIcon: LibraryItem[] = [
  {
    id: ITEMS.ButtonIcon.id,
    title: ITEMS.ButtonIcon.title,
    type: ItemType.html,
    exampleHtml: getExampleHtml(),
    codeHtml: getCodeHtml(),
    documentationHtml: getDocumentationHtml(),
    parent: GROUPS.Buttons,
    dependencyType: ItemDependencyType.css,
  },
];

/*
 * Return value is ignored if LibraryItemType is not html
 */
function getExampleHtml(): string {
  return `
<button type="button" class="btn fhi-btn-icon mb-5">
  <i class="icon-bell"></i>
  <span class="btn__text">Ikon-knapp</span>
</button>
<br>
<button type="button" class="btn fhi-btn-icon fhi-btn-icon--circular">
  <i class="icon-bell"></i>
</button>`;
}

/*
 * Return empty string to use a copy of exampleHtml as codeHtml.
 * Return null to remove Code from library-item.
 */
function getCodeHtml(): string | null {
  return `
<button type="button" class="btn fhi-btn-icon">
  <i class="icon-bell"></i>
  <span class="btn__text">Ikon-knapp</span>
</button>

<button type="button" class="btn fhi-btn-icon fhi-btn-icon--circular">
  <i class="icon-bell"></i>
</button>`;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
  return null;
}
