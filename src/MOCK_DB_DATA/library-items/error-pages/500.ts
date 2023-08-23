import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemsSharedData } from '../library-items-shared-data';

export const ErrorPage500: LibraryItem[] = [{
  id: LibraryItemsSharedData.ErrorPage500.id,
  title: LibraryItemsSharedData.ErrorPage500.title,
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
  Serverfeil
  <span class="fhi-error-page-heading__status-code">
    <span class="visually-hidden"> - </span>
    Statuskode 500
  </span>
</h1>
<p>Her er det et eller annet på serveren som har gått galt.<br>
Oppdater siden eller prøv igjen senere.</p>
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
  return ``;
}
