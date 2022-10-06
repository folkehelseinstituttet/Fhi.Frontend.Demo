import { LibraryItemIds } from 'src/app/library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { BootstrapComponentsBaseUrl, NgBootstrapComponentsBaseUrl } from '../../bootstrap-base-urls';

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
        <a ngbNavLink>Fane nummer 1</a>
        <ng-template ngbNavContent>
            <p>Dette er innhold for fane nummer 1.</p>
        </ng-template>
    </li>
    <li [ngbNavItem]="2">
        <a ngbNavLink>Fane nummer 2</a>
        <ng-template ngbNavContent>
            <p>Dette er innhold for fane nummer 2.</p>
        </ng-template>
    </li>
    <li [ngbNavItem]="3">
        <a ngbNavLink>Fane nummer 3</a>
        <ng-template ngbNavContent>
            <p>Dette er innhold for fane nummer 3.</p>
        </ng-template>
    </li>
    <li [ngbNavItem]="4">
        <a ngbNavLink>Fane nummer 4</a>
        <ng-template ngbNavContent>
            <p>Dette er innhold for fane nummer 4.</p>
        </ng-template>
    </li>
    <li [ngbNavItem]="5">
        <a ngbNavLink>Fane nummer 5</a>
        <ng-template ngbNavContent>
            <p>Dette er innhold for fane nummer 5.</p>
        </ng-template>
    </li>
</ul>

<div [ngbNavOutlet]="nav" class="mt-2"></div>`;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
    return ``;
}
