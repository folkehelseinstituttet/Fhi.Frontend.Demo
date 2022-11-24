import { LibraryItemIds } from '../library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemConstants as CONST } from '../library-item-constants';

export const GlobalHeader: LibraryItem[] = [{
  id: LibraryItemIds.GlobalHeader,
  title: 'Global header',
  type: LibraryItemType.html,
  exampleHtml: getExampleHtml(),
  codeHtml: getCodeHtml(),
  documentationHtml: getDocumentationHtml(),
  fullScreenEnabled: true
}];


/*
 * Return value is ignored if LibraryItemType is not html
 */
function getExampleHtml(): string {
  return getCodeHtml();
}

/*
 * Return empty string to use a copy of exampleHtml as codeHtml.
 * Return null to remove Code from library-item.
 */
function getCodeHtml(): string | null {
  return `
<header class="fhi-header">
  <div class="fhi-header__brand">
    <div class="container fhi-header__brand-container">
      <div class="fhi-header__brand-content">
        <a class="fhi-header__logo" href="javascript:void(0)">
          <i class="icon-fhi-logo fhi-header__logo-icon"></i>
          <span class="visually-hidden">FHI Produktnavn</span>
        </a>
        <div class="fhi-header__project">
          <span class="fhi-header__project-name">Produktnavn</span>
        </div>
      </div>
    </div>
  </div>
</header>`;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
  return null;
}
