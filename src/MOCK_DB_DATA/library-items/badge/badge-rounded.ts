import { SegmentPaths } from 'src/app/segment-paths';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/library/models/library-item.model';
import { BootstrapComponentsBaseUrl } from '../../bootstrap-base-urls';

export const BadgeRounded: LibraryItem[] = [{
  id: 'badgerounded',
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
<h2 class="h5 mt-6 mb-4">Use case</h2>

<ul>
  <li>
    <a href="${SegmentPaths.developer}/${SegmentPaths.components}/badge#badgerounded">Research summaries</a>
    <span class="ms-4 badge rounded-pill fhi-badge fhi-badge--rounded">
      100
      <span class="visually-hidden">summaries availale</span>
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
  <span class="visually-hidden">text explaining what's counted</span>
</span>`;
}

/*
 * Return null to remove Code from library-item.
 */
function getDocumentationHtml(): string | null {
  return `
<p>
  Only use for numerical values. Never use as a stand-alone.
</p>
<p>
  Typical use case is numer of sub items a list item refers to.
</p>
<p>
  Bootstrap documentation for
  <a href="${BootstrapComponentsBaseUrl}/badge">Badge</a>
</p>
`;
}
