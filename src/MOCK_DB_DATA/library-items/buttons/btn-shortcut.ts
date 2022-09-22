import { LibraryItemIds } from 'src/app/views/shared/library/library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/library/models/library-item.model';
import { BootstrapComponentsBaseUrl, NgBootstrapComponentsBaseUrl } from '../../bootstrap-base-urls';

export const BtnShortcut: LibraryItem[] = [{
    id: LibraryItemIds.BtnShortcut,
    title: 'Snarvei-knapp',
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
    return `<a href="/developer/components/navigation" class="btn fhi-nav-shortcut fhi-nav-shortcut--btn">
    <i class="icon-arrow-left-long"></i>
    <span class="fhi-nav-shortcut__text">Snarvei-lenke</span>
</a>`;
}

/*
 * Return null to remove Code from library-item.
 */
function getDocumentationHtml(): string | null {
    return null;
}
