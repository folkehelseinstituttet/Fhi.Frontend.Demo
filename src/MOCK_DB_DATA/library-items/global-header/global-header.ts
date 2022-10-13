import { LibraryItemIds } from 'src/app/library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { BootstrapComponentsBaseUrl, NgBootstrapComponentsBaseUrl } from '../../bootstrap-base-urls';

export const GlobalHeader: LibraryItem[] = [{
  id: LibraryItemIds.GlobalHeader,
  title: 'Global header m/hovedmeny',
  type: LibraryItemType.html,
  exampleHtml: getExampleHtml(),
  codeHtml: getCodeHtml(),
  documentationHtml: getDocumentationHtml(),
  hasPreviewButtons: true
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
  <div class="fhi-app__main-menu">
    <div class="container fhi-app__main-menu-container">
      <nav class="fhi-main-menu">
        <div class="container fhi-main-menu__container">
          <a routerlink="/" class="fhi-main-menu__home-link" href="/developer/modules/GlobalHeader">
            <img alt="FHI - navn på produkt" src="./assets/fhi-common/logos/logo-norsk-kun-forkortelse-hvit-uten-luft-rundt.svg" class="fhi-main-menu__home-link-img">
          </a>
          <button type="button" aria-controls="fhi-main-menu" class="fhi-main-menu__toggler" aria-expanded="false">
            <fa-icon class="ng-fa-icon fhi-main-menu__toggler-icon">
              <svg role="img" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bars" class="svg-inline--fa fa-bars fa-w-14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path></svg>
            </fa-icon>
            <span class="fhi-main-menu__toggler-text">Meny</span>
          </button>
          <div class="collapse fhi-main-menu__collapse">
            <ul class="nav nav-tabs fhi-nav-tabs fhi-main-menu__nav">
              <li class="nav-item">
                <a class="nav-link fhi-main-menu__nav-link active" href="/developer/modules/GlobalHeader">Menypunkt 1</a>
              </li>
              <li class="nav-item">
                <a class="nav-link fhi-main-menu__nav-link" href="/developer/modules/GlobalHeader">Menypunkt 2</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
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
