import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemsSharedData as ITEMS } from '../library-items-shared-data';

export const ErrorPage404: LibraryItem[] = [{
  id: ITEMS.ErrorPage404.id,
  title: ITEMS.ErrorPage404.title,
  type: LibraryItemType.html,
  exampleHtml: getExampleHtml(),
  codeHtml: getCodeHtml(),
  documentationHtml: getDocumentationHtml()
}];


/*
 * Return value is ignored if LibraryItemType is not html
 */
function getExampleHtml(): string {
  return `
<div class="fhi-error-page">
  <h1 class="fhi-error-page__heading">
    Siden finnes ikke
    <span class="fhi-error-page__heading-status-code">
      <span class="visually-hidden"> - </span>
      Statuskode 404
    </span>
  </h1>
  <p>
    Beklager, denne siden finnes ikke. Det kan skyldes en feil i lenken eller at siden er slettet.<br>
    Naviger til annet sted i løsningen, eller <a href="/">gå til forsiden</a>.
  </p>
  <p><a href="#">Meld gjerne fra om brutt lenke</a></p>
</div>
`;
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
