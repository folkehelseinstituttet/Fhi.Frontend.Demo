import { LibraryItemIds } from '../library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemConstants as CONST } from '../library-item-constants';

export const Drawer: LibraryItem[] = [{
  id: LibraryItemIds.Drawer,
  title: 'Drawer',
  type: LibraryItemType.html,
  exampleHtml: getExampleHtml(),
  codeHtml: getCodeHtml(),
  documentationHtml: getDocumentationHtml()
}];


/*
 * Return value is ignored if LibraryItemType is not html
 */
function getExampleHtml(): string {
  return `
<div class="alert bg-warning">
  <i class="icon-info-circle"></i>
  <p>
  	Denne komponenten er avhengig av å ligge i en spesifikk
    <a href="/developer/layout-and-page-templates/LayoutTemplates#${LibraryItemIds.LayoutTemplateExpandableFirstCol}">
      layout med ekspanderbart innhold i første kolonne
    </a>
  </p>
</div>`;
}

/*
 * Return empty string to use a copy of exampleHtml as codeHtml.
 * Return null to remove Code from library-item.
 */
function getCodeHtml(): string | null {
  return `
<div class="fhi-drawer" [ngClass]="{ 'open' : drawerIsOpen }">
  <button type="button" class="btn fhi-drawer__trigger" (click)="toggleDrawer()">
	  <p class="pt-3"><i class="icon-person me-0"></i></p>
	  <p class="d-none d-md-block">Ikontekst</p>
	  <i class="icon-red icon-chevron-double-right" *ngIf="!drawerIsOpen"></i>
	  <i class="icon-red icon-chevron-double-left" *ngIf="drawerIsOpen"></i>
  </button>

  <div class="fhi-drawer__content bg-white mt-n6" [attr.aria-hidden]="!drawerIsOpen" #drawerContent>
	  <p>Skuffinnhold.</p>
  </div>
</div>`;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
  return `
<p>
  Drawer kan benyttes i tilfeller der det er behov for at hovedinnholdsfeltet strekker seg over det meste av sidebredden og det kan tillattes at bruker selv må åpne/lukke lokalnavigasjon/-konfigurering.
</p>`;
}
