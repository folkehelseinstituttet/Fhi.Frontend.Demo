import { LibraryItemIds } from '../library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemConstants as CONST } from '../../library-item-constants';

export const Tabs: LibraryItem[] = [{
  id: LibraryItemIds.Tabs,
  title: 'Tabs',
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
    <a ngbNavLink>Fane 1</a>
    <ng-template ngbNavContent>
      <p>Dette er innhold for fane 1.</p>
    </ng-template>
  </li>
  <li [ngbNavItem]="2">
    <a ngbNavLink>Fane 2</a>
    <ng-template ngbNavContent>
      <p>Dette er innhold for fane 2.</p>
    </ng-template>
  </li>
  <li [ngbNavItem]="3">
    <a ngbNavLink>Fane 3</a>
    <ng-template ngbNavContent>
      <p>Dette er innhold for fane 3.</p>
    </ng-template>
  </li>
  <li [ngbNavItem]="4">
    <a ngbNavLink>Fane 4</a>
    <ng-template ngbNavContent>
      <p>Dette er innhold for fane 4.</p>
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
  Hvis du benytter et annet Javascript-rammeverk må du selv finne passende tredjepartskomponent.
</p>`;
}
