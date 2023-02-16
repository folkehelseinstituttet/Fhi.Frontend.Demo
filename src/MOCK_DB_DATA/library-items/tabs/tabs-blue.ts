import { LibraryItemIds } from '../library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemConstants as CONST } from '../library-item-constants';

export const TabsBlue: LibraryItem[] = [{
  id: LibraryItemIds.TabsBlue,
  title: 'Tabs - blue',
  type: LibraryItemType.ngBootstrap,
  exampleHtml: getExampleHtml(),
  codeHtml: getCodeHtml(),
  documentationHtml: getDocumentationHtml()
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
<ul ngbNav #nav="ngbNav" [(activeId)]="active" class="nav-tabs">
  <li [ngbNavItem]="1">
    <a ngbNavLink [ngClass]="{ 'bg-secondary' : active === 1 }">Design</a>
  </li>
  <li [ngbNavItem]="2">
    <a ngbNavLink [ngClass]="{ 'bg-secondary' : active === 2 }">Komponenter</a>
  </li>
  <li [ngbNavItem]="3">
    <a ngbNavLink [ngClass]="{ 'bg-secondary' : active === 3 }">Bruk</a>
  </li>
  <li [ngbNavItem]="4">
    <a ngbNavLink [ngClass]="{ 'bg-secondary' : active === 4 }">Teknisk dokumentasjon</a>
  </li>
  <li [ngbNavItem]="5">
    <a ngbNavLink [ngClass]="{ 'bg-secondary' : active === 5 }">Krav</a>
  </li>
</ul>`;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
  return `
<p>
  For blå fane, må man legge på <code>class="bg-secondary"</code> på lenken i aktiv fane.
</p>`;
}
