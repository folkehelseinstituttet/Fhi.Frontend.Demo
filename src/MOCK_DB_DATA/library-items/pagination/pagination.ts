import { LibraryItemIds } from 'src/app/library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { BootstrapComponentsBaseUrl, NgBootstrapComponentsBaseUrl } from '../../bootstrap-base-urls';

export const Pagination: LibraryItem[] = [{
  id: LibraryItemIds.Pagination,
  title: 'Pagination',
  type: LibraryItemType.html,
  exampleHtml: getExampleHtml(),
  codeHtml: getCodeHtml(),
  documentationHtml: getDocumentationHtml()
}];


function getExampleHtml(): string {
  return `
<nav aria-label="Sidenavigasjon">
  <ul class="pagination">
    <li class="page-item disabled">
      <a class="page-link" href="/developer/components/Pagination" disabled>
        <i class="icon-arrow-left"></i>
        Forrige
      </a>
    </li>
    <li class="page-item" aria-current="page">
      <a class="page-link" href="/developer/components/Pagination">1</a>
    </li>
    <li class="page-item active">
      <span class="page-item__ellipsis">&#8230;</span>
      <a class="page-link">3</a>
      <span class="page-item__ellipsis">&#8230;</span>
    </li>
    <li class="page-item">
      <a class="page-link" href="/developer/components/Pagination">31</a>
    </li>
    <li class="page-item">
      <a class="page-link" href="/developer/components/Pagination">
        Neste
        <i class="icon-arrow-right"></i>
      </a>
    </li>
  </ul>
</nav>`;
}

/*
 * Return empty string to use a copy of exampleHtml as codeHtml.
 * Return null to remove Code from library-item.
 */
function getCodeHtml(): string | null {
  return ``;
}

/*
 * Return null to remove Code from library-item.
 */
function getDocumentationHtml(): string | null {
  return null;
}
