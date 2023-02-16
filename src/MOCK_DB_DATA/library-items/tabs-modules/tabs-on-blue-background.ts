import { LibraryItemIds } from '../library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemConstants as CONST } from '../library-item-constants';

export const TabsOnBlueBackground: LibraryItem[] = [{
  id: LibraryItemIds.TabsOnBlueBackground,
  title: 'Tabs on light blue background',
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
<div class="bg-secondary">
  <div class="px-2 px-xs-0 px-md-2 px-lg-3 py-3">
    <h1>Overskrift</h1>
    <p>Annet innhold. Dette kan være rik tekst som lister og tabeller.</p>
  </div>

  <ul ngbNav #nav="ngbNav" [(activeId)]="active" class="nav-tabs">
    <li [ngbNavItem]="1">
      <a ngbNavLink>Design</a>
      <ng-template ngbNavContent>
        <p>Innhold for Design.</p>
      </ng-template>
    </li>
    <li [ngbNavItem]="2">
      <a ngbNavLink>Komponenter</a>
      <ng-template ngbNavContent>
        <p>Innhold for Komponenter.</p>
      </ng-template>
    </li>
    <li [ngbNavItem]="3">
      <a ngbNavLink>Eksempler</a>
      <ng-template ngbNavContent>
        <p>Innhold for Eksempler.</p>
      </ng-template>
    </li>
    <li [ngbNavItem]="4">
      <a ngbNavLink>Kode og andre vanskelige ting</a>
      <ng-template ngbNavContent>
        <p>Innhold for Kode og andre vanskelige ting.</p>
      </ng-template>
    </li>
    <li [ngbNavItem]="5">
      <a ngbNavLink>Krav</a>
      <ng-template ngbNavContent>
        <p>Innhold for Krav.</p>
      </ng-template>
    </li>
  </ul>

  <div class="bg-white row">
    <div [ngbNavOutlet]="nav" class="p-3 pt-5"></div>
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
  Ved bruk av React Bootstrap Tabbed Components skal stilsettingen fra FHI Designsystem fungere. Husk <code>class="bg-secondary"</code> på wrapper og <code>class="bg-white"</code> på nav outlet.
</p>`;
}
