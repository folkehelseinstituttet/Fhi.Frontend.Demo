import { LibraryItemIds } from 'src/app/library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { BootstrapComponentsBaseUrl, NgBootstrapComponentsBaseUrl } from '../../bootstrap-base-urls';

export const TagState: LibraryItem[] = [{
  id: LibraryItemIds.TagState,
  title: 'Tag - state',
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
  <span class="fhi-tag text-bg-info">Info tag</span>
</p>
<p>
  <span class="fhi-tag text-bg-success">Success tag</span>
</p>
<p>
  <span class="fhi-tag text-bg-warning">Warning tag</span>
</p>
<p>
  <span class="fhi-tag text-bg-error">Error tag</span>
</p>
`;
}

/*
 * Return empty string to use a copy of exampleHtml as codeHtml.
 * Return null to remove Code from library-item.
 */
function getCodeHtml(): string | null {
  return `
<span class="fhi-tag text-bg-info">Info tag</span>
<span class="fhi-tag text-bg-success">Success tag</span>
<span class="fhi-tag text-bg-warning">Warning tag</span>
<span class="fhi-tag text-bg-error">Error tag</span>
`;
}

/*
 * Return null to remove Code from library-item.
 */
function getDocumentationHtml(): string | null {
  return null;
}
