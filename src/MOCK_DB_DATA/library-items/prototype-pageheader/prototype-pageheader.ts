import { LibraryItemIds } from '../library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemConstants as CONST } from '../library-item-constants';

export const PrototypePageheader: LibraryItem[] = [{
  id: LibraryItemIds.PrototypePageheader,
  title: 'Pageheader FHI Statistikk',
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
<div class="ds-pageheader-component" #pageheadercomponent>
  <div class="fhi-pageheader fhi-pageheader--sticky" [ngClass]="{'fhi-pageheader--sticky__no-logo' : logoHidden}">
    <header class="fhi-header">
      <div class="fhi-header__brand">
        <div class="container fhi-header__brand-container">
          <div class="fhi-header__brand-content">
            <a class="fhi-header__logo" href="javascript:void(0)" (click)="linkSwitch(-1)">
              <i class="icon-fhi-logo fhi-header__logo-icon"></i>
              <span class="visually-hidden">FHI Statistikk</span>
            </a>
            <div class="fhi-header__project">
              <span class="fhi-header__project-name">Statistikk</span>
            </div>
          </div>
        </div>
      </div>

      <div class="container p-0 border-bottom">
        <h1 class="fhi-pageheader__section-title">
          {{ data.name }}
        </h1>
      </div>
      
      <div class="container p-0" #pageheadersubmenucontainer>
        <div class="fhi-pageheader__submenu-container">
          <ul class="fhi-pageheader__submenu" [ngStyle]="{'width' : submenuOverflow ? submenuWidth + 'px' : 'auto'}" #pageheadersubmenu>
            <li class="fhi-pageheader__submenu-item" *ngFor="let subMenuItem of data.subMenu; index as i">
              <a class="btn fhi-btn-menu-item"
                href="javascript:void(0)"
                [ngClass]="{'fhi-btn-menu-item--active': activeLink === i}"
                (click)="linkSwitch(i)">
                <i class="icon-population"></i>
                <span class="btn__text">{{ subMenuItem.name }}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  </div>
</div>`;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
  return ``;
}
