import { LibraryItem } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemsSharedData as ITEMS } from '../library-items-shared-data';
import { LibraryItemGroupsSharedData as GROUPS } from '../library-item-groups-shared-data';
import { ItemDependencyType, ItemType } from 'src/app/views/shared/item-type.enums';

export const TagSingleSelection: LibraryItem[] = [
  {
    id: ITEMS.TagSingleSelection.id,
    title: ITEMS.TagSingleSelection.title,
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
  <input class="fhi-tag-selector__input" type="radio" id="option1" name="singleSelectionTags">
  <label class="fhi-tag-selector__label" for="option1">Valg 1</label>
</div>
<div class="fhi-tag-selector">
  <input class="fhi-tag-selector__input" type="radio" id="option2" name="singleSelectionTags">
  <label class="fhi-tag-selector__label" for="option2">Valg 2</label>
</div>
<div class="fhi-tag-selector">
  <input class="fhi-tag-selector__input" type="radio" id="option3" name="singleSelectionTags">
  <label class="fhi-tag-selector__label" for="option3">Valg 3</label>
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
