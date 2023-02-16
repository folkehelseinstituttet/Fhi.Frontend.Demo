import { LibraryItemIds } from '../library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemConstants as CONST } from '../library-item-constants';

export const TabsBlueAndBlueBackground: LibraryItem[] = [{
  id: LibraryItemIds.TabsBlueAndBlueBackground,
  title: 'Tabs - blue, with blue background',
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
<div class="row">
  <div class="p-0">
    <ul ngbNav #nav="ngbNav" [(activeId)]="active" class="nav-tabs">
      <li [ngbNavItem]="1">
        <a ngbNavLink [ngClass]="{ 'bg-secondary' : active === 1 }">Design</a>
        <ng-template ngbNavContent>
          <p>Innhold for Design.</p>
        </ng-template>
      </li>
      <li [ngbNavItem]="2">
        <a ngbNavLink [ngClass]="{ 'bg-secondary' : active === 2 }">Komponenter</a>
        <ng-template ngbNavContent>
          <p>Innhold for Komponenter.</p>
        </ng-template>
      </li>
      <li [ngbNavItem]="3">
        <a ngbNavLink [ngClass]="{ 'bg-secondary' : active === 3 }">Eksempler</a>
        <ng-template ngbNavContent>
          <p>Innhold for Eksempler.</p>
        </ng-template>
      </li>
      <li [ngbNavItem]="4">
        <a ngbNavLink [ngClass]="{ 'bg-secondary' : active === 4 }">Kode og andre vanskelige ting</a>
        <ng-template ngbNavContent>
          <p>Innhold for Kode og andre vanskelige ting.</p>
        </ng-template>
      </li>
      <li [ngbNavItem]="5">
        <a ngbNavLink [ngClass]="{ 'bg-secondary' : active === 5 }">Krav</a>
        <ng-template ngbNavContent>
          <p>Innhold for Krav.</p>
        </ng-template>
      </li>
    </ul>

    <div class="bg-secondary">
      <div [ngbNavOutlet]="nav" class="p-3 pt-5"></div>
    </div>
  </div>
</div>`;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
  return `
<p>
  Bootstrap-dokumentasjon for
  <a href="${CONST.BootstrapComponentsBaseUrl}/navs-tabs/#tabs">Tabs</a>.
</p>
<p>
  Tabs er implementert som en
  <a href="${CONST.NgBootstrapComponentsBaseUrl}/nav">NgBootstrap Nav</a>
  i FHI Designsystem.
</p>
<p>
  Ved bruk av React Bootstrap Tabbed Components skal stilsettingen fra FHI Designsystem fungere. Husk <code>class="bg-secondary"</code> på lenke til aktiv fane og på container for nav outlet.
</p>`;
}
