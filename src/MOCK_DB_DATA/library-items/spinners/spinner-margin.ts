import { LibraryItemIds } from '../library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemConstants as CONST } from '../library-item-constants';

export const SpinnerMargin: LibraryItem[] = [{
  id: LibraryItemIds.SpinnerMargin,
  title: 'Spinner - margin',
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
<div class="spinner-border m-5" role="status">
  <span class="visually-hidden">Loading...</span>
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
  return `
<p>
  Bootstrap-dokumentasjon for
  <a href="${CONST.BootstrapComponentsBaseUrl}/spinners/#margin">Spinner - margin</a>.
</p>
<p>
  Eksemplet viser hvordan en kan bruke
  <a href="${CONST.BootstrapUtilitiesBaseUrl}/spacing">Bootstrap spacing utilities</a>
  til å plassere spinneren.
</p>
<p>
  OBS! Vi bruker kun <i>Border spinner</i>, og den brukes kun med den fargen som vises her.
</p>`;
}
