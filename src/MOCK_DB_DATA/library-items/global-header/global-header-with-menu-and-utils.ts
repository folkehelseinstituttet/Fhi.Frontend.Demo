import { LibraryItemIds } from '../library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemConstants as CONST } from '../library-item-constants';

export const GlobalHeaderWithMenuAndUtils: LibraryItem[] = [{
  id: LibraryItemIds.GlobalHeaderWithMenuAndUtils,
  title: 'Global header med meny og utility section',
  type: LibraryItemType.fhiAngular,
  exampleHtml: getExampleHtml(),
  codeHtml: getCodeHtml(),
  documentationHtml: getDocumentationHtml(),
  fullScreenEnabled: true
}];


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

      <div class="fhi-utility-section d-flex ms-auto">
        <p class="fhi-utility-section__user">
          <a href="javascript:void(0)" class="d-flex">
            Innlogget Bruker
            <span class="icon-user-regular ms-2"></span>
          </a>
        </p>
        
        <span class="fhi-utility-section__divider"></span>

        <div class="fhi-utility-section__tools">
          <div class="d-flex">
            <button class="fhi-utility-section__btn">
              <span class="icon-bell-regular" ngbTooltip="Varslinger"></span>
            </button>
            <button class="fhi-utility-section__btn">
              <span class="icon-question-circle-regular" ngbTooltip="Hjelp"></span>
            </button>
          </div>
        </div>
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
          <i class="icon-xmark fhi-main-menu__toggler-close-icon"></i>
          <i class="icon-list fhi-main-menu__toggler-menu-icon"></i>
          <span class="fhi-main-menu__toggler-text">{{ !mainMenuIsOpen ? 'Meny' : 'Lukk' }}</span>
        </button>
        <div [ngbCollapse]="!mainMenuIsOpen" [animation]="false" class="collapse fhi-main-menu__collapse">
          <div class="d-flex">
            <ul class="nav nav-tabs fhi-nav-tabs fhi-main-menu__nav">
              <li class="fhi-main-menu__nav-item">
                <a class="nav-link fhi-main-menu__nav-link" [ngClass]="{'active' : activeLink === 1}" href="javascript:void(0)" (click)="linkSwitch(1)">Lenke 1</a>
              </li>
              <li class="fhi-main-menu__nav-item">
                <a class="nav-link fhi-main-menu__nav-link" [ngClass]="{'active' : activeLink === 2}" href="javascript:void(0)" (click)="linkSwitch(2)">Lenke 2</a>
              </li>
            </ul>
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