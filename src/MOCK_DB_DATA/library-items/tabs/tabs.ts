import { LibraryItemIds } from 'src/app/library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { BootstrapComponentsBaseUrl, NgBootstrapComponentsBaseUrl } from '../../bootstrap-base-urls';

export const Tabs: LibraryItem[] = [{
  id: LibraryItemIds.Tabs,
  title: 'Tabs',
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
<ul class="nav nav-tabs">
  <li class="nav-item">
    <a class="nav-link active" aria-current="page" href="/developer/components/Tabs">Aktiv lenke</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="/developer/components/Tabs">Lenke 2</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="/developer/components/Tabs">Lenke 3</a>
  </li>
</ul>`;
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
