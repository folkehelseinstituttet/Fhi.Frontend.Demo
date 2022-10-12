import { LibraryItemIds } from 'src/app/library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { BootstrapComponentsBaseUrl } from '../../bootstrap-base-urls';

export const BadgeRounded: LibraryItem[] = [{
  id: LibraryItemIds.BadgeRounded,
  title: 'Badge - rounded',
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
<span class="badge rounded-pill fhi-badge fhi-badge--rounded">
  100
  <span class="visually-hidden">text explaining what's counted</span>
</span>

<hr>
<h2 class="h5 mt-6 mb-4">Bruksscenario</h2>

<ul>
  <li>
    Forskningssammendrag
    <span class="ms-4 badge rounded-pill fhi-badge fhi-badge--rounded">
      100
      <span class="visually-hidden">sammendrag tilgjengelig</span>
    </span>
  </li>
  <li>
    Andre
    <span class="ms-4 badge rounded-pill fhi-badge fhi-badge--rounded">
      23
      <span class="visually-hidden">sammendrag tilgjengelig</span>
    </span>
  </li>
</ul>`;
}

/*
 * Return empty string to use a copy of exampleHtml as codeHtml.
 * Return null to remove Code from library-item.
 */
function getCodeHtml(): string | null {
  return `
<span class="badge rounded-pill fhi-badge fhi-badge--rounded">
  100
  <span class="visually-hidden">tekst som beskriver hva som telles</span>
</span>`;
}

/*
 * Return null to remove Code from library-item.
 */
function getDocumentationHtml(): string | null {
  return `
<p>
Kun til bruk for numeriske verdier. En badge gir ikke mening uten en kontekst og skal derfor aldri brukes alene.
</p>
<p>
  Typisk bruksscenario: antall enheter en liste refererer til.
</p>
<p>
  Bootstrap-dokumentasjon for
  <a href="${BootstrapComponentsBaseUrl}/badge">Badge</a>
</p>`;
}
