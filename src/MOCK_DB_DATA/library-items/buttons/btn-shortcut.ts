import { LibraryItemIds } from 'src/app/views/shared/library/library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/library/models/library-item.model';
import { BootstrapComponentsBaseUrl, NgBootstrapComponentsBaseUrl } from '../../bootstrap-base-urls';

export const BtnShortcut: LibraryItem[] = [{
    id: LibraryItemIds.ButtonShortcut,
    title: 'Shortcut button',
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
    return `<button type="button" class="btn fhi-btn-shortcut">
    <i class="icon-arrow-left-long"></i>
    <span class="fhi-btn-shortcut__text">Snarveiknapp</span>
</button>`;
}

/*
 * Return null to remove Code from library-item.
 */
function getDocumentationHtml(): string | null {
    return null;
}

