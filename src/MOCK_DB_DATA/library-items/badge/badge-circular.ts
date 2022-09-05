import { LibraryItem, LibraryItemType } from 'src/app/views/shared/library/models/library-item.model';
import { BootstrapComponentsBaseUrl, NgBootstrapComponentsBaseUrl } from '../../bootstrap-base-urls';

export const BadgeCircular: LibraryItem[] = [{
  id: 'badgecircular',
  title: 'Badge - Circular',
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
<p>
  <span class="badge fhi-badge fhi-badge--context1">
    25
    <span class="visually-hidden">tekst som forklarer hva tallet står for</span>
  </span>
</p>
<p>
  <span class="badge fhi-badge fhi-badge--context1">
    25
    <span class="visually-hidden">tekst som forklarer hva tallet står for</span>
  </span>
</p>



<p>
  <button type="button" class="btn btn-md fhi-btn-outline-secondary position-relative">
    Vis flere
    <span class="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-primary">
      5
      <span class="visually-hidden">flere å vise</span>
    </span>
  </button>
</p>
<p class="position-relative">
  <i class="icon-envelope-regular" style="background-size: 2rem; height: 2.5rem; width: 2.5rem;"></i>
  <span class="position-absolute top-0 start-100 translate-middle p-2 bg-warning rounded-circle">
    25
    <span class="visually-hidden">New alerts</span>
  </span>
</p>`;
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
