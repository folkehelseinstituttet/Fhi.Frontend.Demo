import { LibraryItem } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemsSharedData as ITEMS } from '../library-items-shared-data';
import { LibraryItemGroupsSharedData as GROUPS } from '../library-item-groups-shared-data';
import { ItemDependencyType, ItemType } from 'src/app/views/shared/item-type.enums';

export const Search: LibraryItem[] = [
  {
    id: ITEMS.Search.id,
    title: ITEMS.Search.title,
    type: ItemType.html,
    exampleHtml: getExampleHtml(),
    codeHtml: getCodeHtml(),
    documentationHtml: getDocumentationHtml(),
    parent: GROUPS.SearchFields,
    dependencyType: ItemDependencyType.css,
  },
];

/*
 * Return value is ignored if LibraryItemType is not html
 */
function getExampleHtml(): string {
  return `
<div class="fhi-search mb-5">
  <label for="typeahead-basic" class="form-label">Standard søkefelt</label>
  <div class="d-flex">
    <div class="w-100 position-relative">
      <input
        id="typeahead-basic"
        type="search"
        class="form-control fhi-search__form-control"
        placeholder="Søk" />
    </div>
    <button type="button" class="btn fhi-search__btn">
      <i class="fhi-search__btn-icon"></i>
      <span class="fhi-search__btn__text">Søk</span>
    </button>
  </div>
</div>
<div class="fhi-search fhi-search--xl">
  <label for="typeahead-basic" class="form-label">Stort søkefelt</label>
  <div class="d-flex">
    <div class="w-100 position-relative">
      <input
        id="typeahead-basic"
        type="search"
        class="form-control fhi-search__form-control"
        placeholder="Søk" />
    </div>
    <button type="button" class="btn fhi-search__btn">
      <i class="fhi-search__btn-icon"></i>
      <span class="fhi-search__btn__text">Søk</span>
    </button>
  </div>
</div>`;
}

/*
 * Return empty string to use a copy of exampleHtml as codeHtml.
 * Return null to remove Code from library-item.
 */
function getCodeHtml(): string | null {
  return `
<div class="fhi-search"><!-- add fhi-search--xl for tall search field -->
  <label for="typeahead-basic" class="form-label">Søk</label>
  <div class="d-flex">
    <div class="w-100 position-relative">
      <input
        id="typeahead-basic"
        type="search"
        class="form-control fhi-search__form-control"
        placeholder="Søk" />
    </div>
    <button type="button" class="btn fhi-search__btn">
      <i class="fhi-search__btn-icon"></i>
      <span class="fhi-search__btn__text">Søk</span>
    </button>
  </div>
</div>`;
}

/*
 * Return null to remove Code from library-item.
 */
function getDocumentationHtml(): string | null {
  return null;
}
