import { LibraryItemIds } from 'src/app/views/shared/library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { BootstrapComponentsBaseUrl, NgBootstrapComponentsBaseUrl } from '../../bootstrap-base-urls';

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
  <span class="visually-hidden">text explaining what's counted</span>
</span>

<span class="badge fhi-badge fhi-badge--circle-light">
  25
  <span class="visually-hidden">text explaining what's counted</span>
</span>

<hr>
<h2 class="h5 mt-6 mb-4">Use cases</h2>

<p class="d-inline-block position-relative">
  <i class="icon-envelope-regular" style="background-size: 2rem; height: 2.5rem; width: 2.5rem;"></i>
  <span class="position-absolute start-100 translate-middle-x badge fhi-badge fhi-badge--circle-dark">
    25
    <span class="visually-hidden">new emails</span>
  </span>
</p>
<p>
  <button type="button" class="btn btn-md fhi-btn-secondary position-relative">
    Show more
    <span class="position-absolute top-0 start-100 translate-middle badge fhi-badge fhi-badge--circle-light">
      25
      <span class="visually-hidden">more to show</span>
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
    <span class="visually-hidden">new emails</span>
  </span>
</p>

<button type="button" class="btn btn-md fhi-btn-secondary position-relative">
  Show more
  <span class="position-absolute top-0 start-100 translate-middle badge fhi-badge fhi-badge--circle-light">
    25
    <span class="visually-hidden">more to show</span>
  </span>
</button>`;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
  return `
<p>
  Only use for numerical values. Never use as a stand-alone.
</p>
<p>
  Bootstrap documentation for
  <a href="${BootstrapComponentsBaseUrl}/badge">Badge</a>
</p>
`;
}
