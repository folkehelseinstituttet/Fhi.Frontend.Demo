import { LibraryItem } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemsSharedData as ITEMS } from '../library-items-shared-data';
import { LibraryItemGroupsSharedData as GROUPS } from '../library-item-groups-shared-data';
import { ItemDependencyType, ItemType } from 'src/app/views/shared/item-type.enums';

export const GlobalHeader: LibraryItem[] = [
  {
    id: ITEMS.GlobalHeader.id,
    title: ITEMS.GlobalHeader.title,
    type: ItemType.html,
    exampleHtml: getExampleHtml(),
    codeHtml: getCodeHtml(),
    documentationHtml: getDocumentationHtml(),
    fullScreenEnabled: true,
    parent: GROUPS.GlobalHeaders,
    dependencyType: ItemDependencyType.css,
  },
];

/*
 * Return value is ignored if LibraryItemType is not html
 */
function getExampleHtml(): string {
  return getCodeHtml();
}

/*
 * Return empty string to use a copy of exampleHtml as codeHtml.
 * Return null to remove Code from library-item.
 */
function getCodeHtml(): string | null {
  return `
<header class="fhi-header">
  <div class="fhi-header__brand">
    <div class="container fhi-header__brand-container">
      <div class="fhi-header__brand-content">
        <a class="fhi-header__logo" href="javascript:void(0)">
          <i class="icon-fhi-logo fhi-header__logo-icon"></i>
          <span class="visually-hidden">FHI Produktnavn</span>
        </a>
        <div class="fhi-header__project">
          <span class="fhi-header__project-name">Produktnavn</span>
        </div>
      </div>
    </div>
  </div>
</header>`;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
  return null;
}
