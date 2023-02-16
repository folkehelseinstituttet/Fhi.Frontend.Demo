import { LibraryItemIds } from '../library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemConstants as CONST } from '../library-item-constants';

export const TabsBottomBordered: LibraryItem[] = [{
  id: LibraryItemIds.TabsBottomBordered,
  title: 'Tabs with border',
  type: LibraryItemType.fhiAngular,
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
<ul ngbNav #nav="ngbNav" [(activeId)]="active" class="nav-tabs border-bottom">
  <li [ngbNavItem]="1">
      <a ngbNavLink>Fane nummer 1</a>
      <ng-template ngbNavContent>
          <p>Innhold for fane nummer <strong>1</strong>.</p>
      </ng-template>
  </li>
  <li [ngbNavItem]="2">
      <a ngbNavLink>Fane nummer 2</a>
      <ng-template ngbNavContent>
          <p>Innhold for fane nummer <strong>2</strong>.</p>
      </ng-template>
  </li>
  <li [ngbNavItem]="3">
      <a ngbNavLink>Fane nummer 3</a>
      <ng-template ngbNavContent>
          <p>Innhold for fane nummer <strong>3</strong>.</p>
      </ng-template>
  </li>
  <li [ngbNavItem]="4">
      <a ngbNavLink>Fane nummer 4</a>
      <ng-template ngbNavContent>
          <p>Innhold for fane nummer <strong>4</strong>.</p>
      </ng-template>
  </li>
</ul>

<div [ngbNavOutlet]="nav" class="mt-5"></div>`;
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
  Ved bruk av React Bootstrap Tabbed Components skal stilsettingen fra FHI Designsystem fungere. Husk <code>class="border-bottom"</code> på <code>ul</code>
</p>`;
}
