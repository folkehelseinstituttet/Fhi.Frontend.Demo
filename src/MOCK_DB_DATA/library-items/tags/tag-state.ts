import { LibraryItemIds } from 'src/app/library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { BootstrapComponentsBaseUrl, NgBootstrapComponentsBaseUrl } from '../../bootstrap-base-urls';

export const TagState: LibraryItem[] = [{
  id: LibraryItemIds.TagState,
  title: 'Tag - state/tilstand',
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
  <span class="fhi-tag text-bg-info">Til informasjon.</span>
</p>
<p>
  <span class="fhi-tag text-bg-success">Suksess!</span>
</p>
<p>
  <span class="fhi-tag text-bg-warning">Advarsel!</span>
</p>
<p>
  <span class="fhi-tag text-bg-error">Feilmelding.</span>
</p>
`;
}

/*
 * Return empty string to use a copy of exampleHtml as codeHtml.
 * Return null to remove Code from library-item.
 */
function getCodeHtml(): string | null {
  return `
<span class="fhi-tag text-bg-info">Til informasjon.</span>
<span class="fhi-tag text-bg-success">Suksess!</span>
<span class="fhi-tag text-bg-warning">Advarsel!</span>
<span class="fhi-tag text-bg-error">Feilmelding.</span>
`;
}

/*
 * Return null to remove Code from library-item.
 */
function getDocumentationHtml(): string | null {
  return null;
}
