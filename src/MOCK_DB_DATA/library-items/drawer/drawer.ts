import { LibraryItemIds } from '../library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemConstants as CONST } from '../library-item-constants';

export const Drawer: LibraryItem[] = [{
  id: LibraryItemIds.Drawer,
  title: 'Drawer',
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
<div class="container">
	<div class="fhi-drawer">
		<div class="row">
			<div class="col-12 col-md-auto">
				<div class="fhi-drawer__drawer" [ngClass]="{ 'open' : drawerIsOpen3 }">
					<button type="button" class="btn fhi-drawer__trigger" (click)="toggleDrawer3()">
						<p class="pt-3"><i class="icon-user-regular me-0"></i></p>
						<p class="d-none d-md-block">Ikontekst</p>
						<i class="icon-red icon-chevron-double-right" *ngIf="!drawerIsOpen3"></i>
						<i class="icon-red icon-chevron-double-left" *ngIf="drawerIsOpen3"></i>
					</button>
					
					<div class="fhi-drawer__content fhi-drawer__content--wide bg-white mt-n6" [attr.aria-hidden]="!drawerIsOpen3" #drawerContent3>
						<p>Skuffinnhold.</p>
					</div>
				</div>
			</div>
				
			<div class="col-12 col-md">
				<div class="fhi-drawer__outside-content mt-n6 ps-7 mt-md-0 ps-md-0" [ngStyle]="{'min-height': drawerHeight3 + 'px'}">
					<main>
						<h1>Hovedinnhold</h1>
					</main>
				</div>
			</div>
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
  Drawer er en skreddersydd komponent i FHI Angular Modules
</p>`;
}
