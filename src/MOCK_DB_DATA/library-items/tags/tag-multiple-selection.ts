import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemsSharedData as ITEMS } from '../library-items-shared-data';
import { LibraryItemConstants as CONST } from '../library-item-constants';

export const TagMultipleSelection: LibraryItem[] = [
  {
    id: ITEMS.TagMultipleSelection.id,
    title: ITEMS.TagMultipleSelection.title,
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
