import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemsSharedData as ITEMS } from '../library-items-shared-data';

export const ErrorPage500: LibraryItem[] = [{
  id: ITEMS.ErrorPage500.id,
  title: ITEMS.ErrorPage500.title,
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
    Serverfeil
    <span class="fhi-error-page__heading-status-code">
      <span class="visually-hidden"> - </span>
      Statuskode 500
    </span>
  </h1>
  <p>
    Her er det et eller annet på serveren som har gått galt.<br>
    Oppdater siden eller prøv igjen senere.
  </p>
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
