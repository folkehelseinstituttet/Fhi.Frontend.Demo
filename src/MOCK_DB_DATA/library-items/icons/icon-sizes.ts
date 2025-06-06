import { LibraryItem } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemsSharedData as ITEMS } from '../library-items-shared-data';
import { LibraryItemGroupsSharedData as GROUPS } from '../library-item-groups-shared-data';
import { LibraryItemConstants as CONST } from '../library-item-constants';
import { ItemDependencyType, ItemType } from 'src/app/views/shared/item-type.enums';

export const IconSizes: LibraryItem[] = [
  {
    id: ITEMS.VisualIdentityIconSizes.id,
    title: ITEMS.VisualIdentityIconSizes.title,
    titleLang: CONST.languageLocaleId_NO,
    type: ItemType.html,
    exampleHtml: getExampleHtml(),
    codeHtml: getCodeHtml(),
    documentationHtml: getDocumentationHtml(),
    parent: GROUPS.Icons,
    dependencyType: ItemDependencyType.css,
  },
];

/*
 * Return value is ignored if LibraryItemType is not html
 */
function getExampleHtml(): string {
  return `
<div class="d-flex flex-wrap">
  <div class="me-4 text-center"><small>sm<br>16x16</small><br><i class="icon-cloud-fog icon-sm"></i></div>
  <div class="me-4 text-center"><small>md<br>24x24</small><br><i class="icon-cloud-fog icon-md"></i></div>
  <div class="me-4 text-center"><small>lg<br>32x32</small><br><i class="icon-cloud-fog icon-lg"></i></div>
  <div class="text-center"><small>xl<br>40x40</small><br><i class="icon-cloud-fog icon-xl"></i></div>
</div>`;
}

/*
 * Return empty string to use a copy of exampleHtml as codeHtml.
 * Return null to remove Code from library-item.
 */
function getCodeHtml(): string {
  return `
<i class="icon-[name] icon-sm"></i>
<i class="icon-[name] icon-md"></i>
<i class="icon-[name] icon-lg"></i>
<i class="icon-[name] icon-xl"></i>`;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
  return null;
}
