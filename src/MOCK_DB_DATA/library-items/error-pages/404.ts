import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemsSharedData } from '../library-items-shared-data';

export const ErrorPage404: LibraryItem[] = [{
  id: LibraryItemsSharedData.ErrorPage404.id,
  title: LibraryItemsSharedData.ErrorPage404.title,
  type: LibraryItemType.html,
  exampleHtml: getExampleHtml(),
  codeHtml: getCodeHtml(),
  documentationHtml: getDocumentationHtml(),
  fullScreenEnabled: true
}];


/*
 * Return value is ignored if LibraryItemType is not html
 */
function getExampleHtml(): string {
  return `
<main class="container">
  <div class="row justify-content-center">
    <div class="col-xl-8 col-xxl-6">
      <h1 class="fhi-error-page-heading">
        Siden finnes ikke
        <span class="fhi-error-page-heading__code">
          <span class="visually-hidden"> - </span>
          Statuskode 404
        </span>
      </h1>
    </div>
  </div>
</main>
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
