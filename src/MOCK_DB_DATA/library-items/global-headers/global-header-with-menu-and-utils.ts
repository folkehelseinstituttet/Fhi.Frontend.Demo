import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemsSharedData as ITEMS } from '../library-items-shared-data';
import { LibraryItemConstants as CONST } from '../library-item-constants';

export const GlobalHeaderWithMenuAndUtils: LibraryItem[] = [
  {
    id: ITEMS.GlobalHeaderWithMenuAndUtils.id,
    title: ITEMS.GlobalHeaderWithMenuAndUtils.title,
    type: LibraryItemType.angular,
    exampleHtml: getExampleHtml(),
    codeHtml: getCodeHtml(),
    documentationHtml: getDocumentationHtml(),
    fullScreenEnabled: true,
  },
];

/*
 * Return value is ignored if LibraryItemType is not html
 */
function getExampleHtml(): string {
  return ``;
}

/*
 * Return empty string to use a copy of exampleHtml as codeHtml.
 * Return null to remove Code from library-item.
 */
function getCodeHtml(): string | null {
  return `
<header class="fhi-header">
  <div class="fhi-header__brand">
    <div class="container fhi-header__brand-container d-flex">
      <div class="fhi-header__brand-content">
        <a class="fhi-header__logo" href="javascript:void(0)">
          <i class="icon-fhi-logo fhi-header__logo-icon"></i>
          <span class="visually-hidden">FHI Pruduktnavn</span>
        </a>
        <div class="fhi-header__project">
          <span class="fhi-header__project-name">Produktnavn</span>
        </div>
      </div>

      <div class="fhi-utility-section d-none d-xl-flex ms-auto me-lg-7 pe-lg-4 me-xl-0 pe-xl-0">
        <p class="fhi-utility-section__group">
          <a href="javascript:void(0)" class="d-flex">
            Innlogget Bruker
            <span class="icon-person ms-2 me-2"></span>
          </a>
        </p>
        
        <span class="fhi-utility-section__divider"></span>

        <div class="fhi-utility-section__group">
          <div class="d-flex">
            <a class="fhi-utility-section__btn" href="javascript:void(0)">
              <span class="icon-bell icon-lg" ngbTooltip="Varslinger"></span>
            </a>
            <a class="fhi-utility-section__btn" href="javascript:void(0)">
              <span class="icon-question-circle icon-lg" ngbTooltip="Hjelp"></span>
            </a>
          </div>
        </div>
        
        <span class="fhi-utility-section__divider d-xl-none"></span>
      </div>
    </div>
  </div>
  
  <div class="container fhi-header__main-menu-container">
    <nav class="fhi-main-menu" [ngClass]="{'fhi-main-menu--open': mainMenuIsOpen}">
      <div class="container fhi-main-menu__container">
        <a class="fhi-main-menu__home-link" href="javascript:void(0)">
          <i class="icon-fhi-logo fhi-header__logo-icon fhi-main-menu__logo-icon"></i>
          <span class="visually-hidden">FHI Produktnavn</span>
        </a>

        <button
          type="button"
          aria-controls="fhi-main-menu"
          class="fhi-main-menu__toggler"
          [attr.aria-expanded]="mainMenuIsOpen"
          (click)="mainMenuToggle()">
          <i class="icon-x fhi-main-menu__toggler-close-icon"></i>
          <i class="icon-list fhi-main-menu__toggler-menu-icon"></i>
          <span class="fhi-main-menu__toggler-text">{{ !mainMenuIsOpen ? 'Meny' : 'Lukk' }}</span>
        </button>
        <div [ngbCollapse]="!mainMenuIsOpen" [animation]="false" class="collapse fhi-main-menu__collapse">
          <div class="d-flex flex-wrap">
            <ul class="nav nav-tabs fhi-nav-tabs fhi-main-menu__nav">
              <li class="fhi-main-menu__nav-item">
                <a class="nav-link fhi-main-menu__nav-link" [ngClass]="{'active' : activeLink === 1}" href="javascript:void(0)" (click)="linkSwitch(1)">Lenke 1</a>
              </li>
              <li class="fhi-main-menu__nav-item">
                <a class="nav-link fhi-main-menu__nav-link" [ngClass]="{'active' : activeLink === 2}" href="javascript:void(0)" (click)="linkSwitch(2)">Lenke 2</a>
              </li>
            </ul>

            <div class="fhi-utility-section fhi-utility-section--megamenu d-block d-xl-none">
              <div class="fhi-utility-section__group">
                <div class="my-1 py-1">
                  <a class="d-flex text-white" href="javascript:void(0)">
                    <span class="icon-person icon-white icon-lg me-2"></span>
                    Innlogget Bruker
                  </a>
                </div>
                <div class="my-1 py-1">
                  <a class="d-flex text-white" href="javascript:void(0)">
                    <span class="icon-bell icon-white icon-lg me-2"></span>
                    Varslinger
                  </a>
                </div>
                <div class="my-1 py-1">
                  <a class="d-flex text-white" href="javascript:void(0)">
                    <span class="icon-question-circle icon-white icon-lg me-2"></span>
                    Hjelp
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </nav>
    <div class="fhi-backdrop-responsive" *ngIf="mainMenuIsOpen" (click)="mainMenuClose()"></div>
  </div>
</header>`;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
  return null;
}
