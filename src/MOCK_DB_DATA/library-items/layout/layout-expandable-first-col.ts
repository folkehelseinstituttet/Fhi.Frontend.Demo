import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemsSharedData as ITEMS } from '../library-items-shared-data';

export const LayoutExpandableFirstCol: LibraryItem[] = [
  {
    id: ITEMS.LayoutExpandableFirstCol.id,
    title: ITEMS.LayoutExpandableFirstCol.title,
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
<div class="container">
	<div class="fhi-expandable-first-col">
		<div class="row">
			<div class="col-12 col-md-auto">
				<div class="fhi-drawer" [ngClass]="{ 'open' : drawerIsOpen }">
					<button type="button" class="btn fhi-drawer__trigger" (click)="toggleDrawer()">
						<i class="icon-red icon-chevron-double-right" *ngIf="!drawerIsOpen"></i>
						<i class="icon-red icon-chevron-double-left" *ngIf="drawerIsOpen"></i>
					</button>
					
					<div class="fhi-drawer__content bg-white mt-n6" [attr.aria-hidden]="!drawerIsOpen" #drawerContent>
						<p>Skuffinnhold.</p>
					</div>
				</div>
			</div>
				
			<div class="col-12 col-md">
				<main class="fhi-expandable-first-col__main mt-n6 ps-7 mt-md-0 ps-md-0" [ngStyle]="{'min-height': drawerHeight + 'px'}">
					<h1>Hovedinnhold</h1>
				</main>
			</div>
		</div>
	</div>
</div>
`;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
  return `
<p>Dette er påkrevet layout for bruk av innhold i første kolonne som skal være ekspanderbart.</p>`;
}
