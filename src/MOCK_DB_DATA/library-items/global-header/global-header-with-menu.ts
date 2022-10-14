import { LibraryItemIds } from '../library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemConstants as CONST } from '../library-item-constants';

export const GlobalHeaderWithMenu: LibraryItem[] = [{
  id: LibraryItemIds.GlobalHeaderWithMenu,
  title: 'Global header w/menu',
  type: LibraryItemType.fhiAngular,
  exampleHtml: getExampleHtml(),
  codeHtml: getCodeHtml(),
  documentationHtml: getDocumentationHtml(),
  hasPreviewButton: true
}];


/*
 * Return value is ignored if LibraryItemType is not html
 */
function getExampleHtml(): string {
  return `<div class="position-relative">` + getCodeHtml() + `</div>`;
}

/*
 * Return empty string to use a copy of exampleHtml as codeHtml.
 * Return null to remove Code from library-item.
 */
function getCodeHtml(): string | null {
  return `
<header class="fhi-app__header">
  <div class="fhi-app__brand">
    <div class="container fhi-app__brand-container">
      <div class="fhi-app__brand-content">
        <a class="fhi-app__logo" href="/developer/modules/GlobalHeader">
          <img src="./assets/fhi-common/logos/logo-norsk-kun-forkortelse-svart-uten-luft-rundt.svg" alt="FHI - navn på produkt">
        </a>
        <div class="fhi-app__project">
          <span class="fhi-app__project-name">Navn på produkt</span>
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
  return ``;
}
