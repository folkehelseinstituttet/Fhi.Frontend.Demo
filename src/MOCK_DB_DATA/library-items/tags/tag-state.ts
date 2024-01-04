import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemsSharedData as ITEMS } from '../library-items-shared-data';
import { LibraryItemConstants as CONST } from '../library-item-constants';

export const TagState: LibraryItem[] = [
  {
    id: ITEMS.TagState.id,
    title: ITEMS.TagState.title,
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
<div class="row">
  <div class="col-auto mb-5 mb-sm-0">
    <h3 class="h5 mb-3">Kun tekst</h3>
    <p>
      <span class="fhi-tag text-bg-info">Til informasjon.</span>
    </p>
    <p>
      <span class="fhi-tag text-bg-success">Suksess!</span>
    </p>
    <p>
      <span class="fhi-tag text-bg-warning">Advarsel!</span>
    </p>
    <p>
      <span class="fhi-tag text-bg-error">Feilmelding.</span>
    </p>
  </div>

  <div class="col-auto">
    <h3 class="h5 mb-3">Knapp/lenke</h3>
    <p>
      <a href="#" class="fhi-tag text-bg-info">Til informasjon.</a>
    </p>
    <p>
      <button type="button" class="fhi-tag text-bg-success">Suksess!</button>
    </p>
    <p>
      <a href="#" class="fhi-tag text-bg-warning">Advarsel!</a>
    </p>
    <p>
      <a href="#" class="fhi-tag text-bg-error">Feilmelding.</a>
    </p>
  </div>
</div>`;
}

/*
 * Return empty string to use a copy of exampleHtml as codeHtml.
 * Return null to remove Code from library-item.
 */
function getCodeHtml(): string | null {
  return `
<span class="fhi-tag text-bg-info">Til informasjon.</span>

<a href="#" class="fhi-tag text-bg-success">Suksess!</a>

<button type="button" class="fhi-tag text-bg-warning">Advarsel!</button>

<span class="fhi-tag text-bg-error">Feilmelding.</span>`;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
  return `
<p>Brukes til å gjøre oppmerksom på endringer, nytt eller viktig innhold.</p>`;
}
