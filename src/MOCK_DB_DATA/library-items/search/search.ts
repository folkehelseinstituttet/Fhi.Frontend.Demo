import { LibraryItemIds } from 'src/app/library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { BootstrapComponentsBaseUrl, NgBootstrapComponentsBaseUrl } from '../../bootstrap-base-urls';

export const Search: LibraryItem[] = [{
  id: LibraryItemIds.Search,
  title: 'Search',
  type: LibraryItemType.ngBootstrap,
  exampleHtml: getExampleHtml(),
  codeHtml: getCodeHtml(),
  documentationHtml: getDocumentationHtml()
}];


/*
 * Return value is ignored if LibraryItemType is not html
 */
function getExampleHtml(): string {
  return ``;
}

/*
 * Return empty string to use a copy of exampleHtml as codeHtml.
 * Return null to remove Code from library-item.
 */
function getCodeHtml(): string | null {
  return `
<div class="fhi-search"><!-- add fhi-search--xl for tall search field -->
  <label for="typeahead-basic" class="form-label">Søk etter et land (eller territorium)</label>

  <div class="d-flex">
    <div class="w-100 position-relative">
      <input
        id="typeahead-basic"
        type="search"
        class="form-control fhi-search__form-control"
        placeholder="Start søk..."
        [ngbTypeahead]="search"/>
    </div>

    <button type="button" class="btn fhi-btn-secondary fhi-search__btn">
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
  return `
<p>
  Autosuggest i søkefeltet er implementert som en
  <a href="${NgBootstrapComponentsBaseUrl}/typeahead">NgBootstrap Typeahead</a>
  i FHI Designsystem.
</p>
<p>
  Bootstrap-dokumentasjon for
  <a href="${BootstrapComponentsBaseUrl}/dropdowns">Dropdowns</a>
  som er basen for NgBootstrap Typeahead.
</p>`;
}
