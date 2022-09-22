import { LibraryItemIds } from 'src/app/views/shared/library/library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/library/models/library-item.model';
import { BootstrapComponentsBaseUrl, NgBootstrapComponentsBaseUrl } from '../../bootstrap-base-urls';

export const BtnShortcutLink: LibraryItem[] = [{
    id: LibraryItemIds.ButtonShortcutLink,
    title: 'Snarvei-lenke',
    type: LibraryItemType.html,
    exampleHtml: getExampleHtml(),
    codeHtml: getCodeHtml(),
    documentationHtml: getDocumentationHtml()
}];


function getExampleHtml(): string {
    return `<a href="/developer/components/buttons" class="btn fhi-btn-shortcut-link">
    <i class="icon-arrow-right"></i>
    <span class="btn__text">Snarvei-lenke</span>
</a>

<br>

<a href="/developer/components/buttons" class="btn fhi-btn-shortcut-link">
    <i class="icon-arrow-left-red"></i>
    <span class="btn__text">Snarvei-lenke</span>
</a>`;
}

/*
 * Return empty string to use a copy of exampleHtml as codeHtml.
 * Return null to remove Code from library-item.
 */
function getCodeHtml(): string | null {
    return `<a href="/url" class="btn fhi-btn-shortcut-link">
    <i class="icon-arrow-right"></i>
    <span class="btn__text">Snarvei-lenke</span>
</a>

<a href="/url" class="btn fhi-btn-shortcut-link">
    <i class="icon-arrow-left-red"></i>
    <span class="btn__text">Snarvei-lenke</span>
</a>`;
}

/*
 * Return null to remove Code from library-item.
 */
function getDocumentationHtml(): string | null {
    return null;
}
