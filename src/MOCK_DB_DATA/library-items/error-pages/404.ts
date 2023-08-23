import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemsSharedData } from '../library-items-shared-data';

export const ErrorPage404: LibraryItem[] = [{
  id: LibraryItemsSharedData.ErrorPage404.id,
  title: LibraryItemsSharedData.ErrorPage404.title,
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
<h1 class="fhi-error-page-heading">
  Siden finnes ikke
  <span class="fhi-error-page-heading__status-code">
    <span class="visually-hidden"> - </span>
    Statuskode 404
  </span>
</h1>

<p>Beklager, denne siden finnes ikke. Det kan skyldes en feil i lenken eller at siden er slettet.<br>
Naviger til annet sted i løsningen, eller <a href="/">gå til forsiden</a>.</p>

<p><a href="#">Meld gjerne fra om brutt lenke</a></p>
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
