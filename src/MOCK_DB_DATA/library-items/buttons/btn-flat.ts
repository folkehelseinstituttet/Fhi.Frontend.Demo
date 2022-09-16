import { LibraryItemIds } from 'src/app/views/shared/library/library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/library/models/library-item.model';
import { BootstrapComponentsBaseUrl, NgBootstrapComponentsBaseUrl } from '../../bootstrap-base-urls';

export const BtnFlat: LibraryItem[] = [{
    id: LibraryItemIds.ButtonLink,
    title: 'Transparent button',
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
    return `<button type="button" class="btn fhi-btn-flat">
    Flat knapp
</button>`;
}

/*
 * Return null to remove Code from library-item.
 */
function getDocumentationHtml(): string | null {
    return null;
}

