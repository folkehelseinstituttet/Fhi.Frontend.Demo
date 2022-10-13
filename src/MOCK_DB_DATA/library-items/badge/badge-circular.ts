import { LibraryItemIds } from '../library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemConstants as CONST } from '../../library-item-constants';

export const BadgeCircular: LibraryItem[] = [{
  id: LibraryItemIds.BadgeCircular,
  title: 'Badge - circular',
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
<span class="badge fhi-badge fhi-badge--circle-dark">
  25
  <span class="visually-hidden">tekst som forklarer hva tallet er</span>
</span>
<span class="badge fhi-badge fhi-badge--circle-light">
  25
  <span class="visually-hidden">tekst som forklarer hva tallet er</span>
</span>
<hr>
<h2 class="h5 mt-6 mb-4">Brukerscenarier</h2>
<p class="d-inline-block position-relative">
  <i class="icon-envelope-regular" style="background-size: 2rem; height: 2.5rem; width: 2.5rem;"></i>
  <span class="position-absolute start-100 translate-middle-x badge fhi-badge fhi-badge--circle-dark">
    25
    <span class="visually-hidden">nye e-poster</span>
  </span>
</p>
<p>
  <button type="button" class="btn btn-md fhi-btn-secondary position-relative">
    Vis flere
    <span class="position-absolute top-0 start-100 translate-middle badge fhi-badge fhi-badge--circle-light">
      25
      <span class="visually-hidden">flere å vise</span>
    </span>
  </button>
</p>`;
}

/*
 * Return empty string to use a copy of exampleHtml as codeHtml.
 * Return null to remove Code from library-item.
 */
function getCodeHtml(): string | null {
  return `
<p class="d-inline-block position-relative">
  <i class="icon-envelope-regular" style="background-size: 2rem; height: 2.5rem; width: 2.5rem;"></i>
  <span class="position-absolute start-100 translate-middle-x badge fhi-badge fhi-badge--circle-dark">
    25
    <span class="visually-hidden">nye e-poster</span>
  </span>
</p>

<button type="button" class="btn btn-md fhi-btn-secondary position-relative">
  Vis flere
  <span class="position-absolute top-0 start-100 translate-middle badge fhi-badge fhi-badge--circle-light">
    25
    <span class="visually-hidden">flere å vise</span>
  </span>
</button>`;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
  return `
<p>
  Kun til bruk for numeriske verdier. En badge gir ikke mening uten en kontekst og skal derfor aldri brukes alene.
</p>
<p>
  Bootstrap-dokumentasjon for
  <a href="${CONST.BootstrapComponentsBaseUrl}/badge">Badge</a>
</p>`;
}
