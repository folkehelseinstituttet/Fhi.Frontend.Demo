import { LibraryItem } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemsSharedData as ITEMS } from '../library-items-shared-data';
import { LibraryItemGroupsSharedData as GROUPS } from '../library-item-groups-shared-data';
import { ItemDependencyType, ItemType } from 'src/app/views/shared/item-type.enums';

export const TagMultipleSelection: LibraryItem[] = [
  {
    id: ITEMS.TagMultipleSelection.id,
    title: ITEMS.TagMultipleSelection.title,
    type: ItemType.html,
    exampleHtml: getExampleHtml(),
    codeHtml: getCodeHtml(),
    documentationHtml: getDocumentationHtml(),
    parent: GROUPS.Tags,
    dependencyType: ItemDependencyType.css,
  },
];

/*
 * Return value is ignored if LibraryItemType is not html
 */
function getExampleHtml(): string {
  return `
<div class="fhi-tag-selector">
  <input class="fhi-tag-selector__input" type="checkbox" id="mltpl-opt-1">
  <label class="fhi-tag-selector__label" for="mltpl-opt-1">
    <i class="icon-plus"></i>
    <i class="icon-check"></i>
    Valg 1
  </label>
</div>
<div class="fhi-tag-selector">
  <input class="fhi-tag-selector__input" type="checkbox" id="mltpl-opt-2">
  <label class="fhi-tag-selector__label" for="mltpl-opt-2">
    <i class="icon-plus"></i>
    <i class="icon-check"></i>
    Valg 2
  </label>
</div>
<div class="fhi-tag-selector">
  <input class="fhi-tag-selector__input" type="checkbox" id="mltpl-opt-3">
  <label class="fhi-tag-selector__label" for="mltpl-opt-3">
    <i class="icon-plus"></i>
    <i class="icon-check"></i>
    Valg 3
  </label>
</div>`;
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
