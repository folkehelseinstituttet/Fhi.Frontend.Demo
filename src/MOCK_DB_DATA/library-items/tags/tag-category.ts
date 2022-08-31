import { LibraryItem, LibraryItemType } from 'src/app/views/shared/library/models/library-item.model';
import { BootstrapComponentsBaseUrl, NgBootstrapComponentsBaseUrl } from '../../bootstrap-base-urls';

export const TagCategory: LibraryItem[] = [{
  id: 'tag',
  title: 'Tag - category',
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
  <a href="/developer/components/tags" class="fhi-tag fhi-tag--category">Category name</a>
</p>
<p>
  <a href="/developer/components/tags" class="fhi-tag fhi-tag--category">
    <i class="icon-arrow-left-long"></i>
    Category name
  </a>
</p>
<p class="mb-0">
  <span class="fhi-tag fhi-tag--category">Category (no link)</span>
</p>
`;
}

/*
 * Return empty string to use a copy of exampleHtml as codeHtml.
 * Return null to remove Code from library-item.
 */
function getCodeHtml(): string | null {
  return `
<a href="/url" class="fhi-tag fhi-tag--category">Category name</a>

<a href="/url" class="fhi-tag fhi-tag--category">
  <i class="icon-arrow-left-long"></i>
  Category name
</a>

<span class="fhi-tag fhi-tag--category">Category (no link)</span>
`;
}

/*
 * Return null to remove Code from library-item.
 */
function getDocumentationHtml(): string | null {
  return null;
}
