import { LibraryItemIds } from 'src/app/views/shared/library/library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/library/models/library-item.model';
import { BootstrapComponentsBaseUrl, NgBootstrapComponentsBaseUrl } from '../../bootstrap-base-urls';

export const NavMenuBtn: LibraryItem[] = [{
    id: LibraryItemIds.ButtonMenuItem,
    title: 'Menyknapp',
    type: LibraryItemType.html,
    exampleHtml: getExampleHtml(),
    codeHtml: getCodeHtml(),
    documentationHtml: getDocumentationHtml()
}];


function getExampleHtml(): string {
    return getCodeHtml();
}

/*
 * Return empty string to use a copy of exampleHtml as codeHtml.
 * Return null to remove Code from library-item.
 */
function getCodeHtml(): string | null {
    return `<a href="/developer/components/navigation" class="btn fhi-nav-menu-btn">
    <i class="icon-population"></i>
    <span class="fhi-nav-menu-btn__text">Menyknapp</span>
</a>
<br><br>
<a href="/developer/components/navigation" class="btn fhi-nav-menu-btn fhi-nav-menu-btn--active">
    <i class="icon-population"></i>
    <span class="fhi-nav-menu-btn__text">Menyknapp</span>
</a>`;
}

/*
 * Return null to remove Code from library-item.
 */
function getDocumentationHtml(): string | null {
    return null;
}
