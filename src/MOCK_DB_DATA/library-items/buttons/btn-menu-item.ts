import { LibraryItemIds } from 'src/app/library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { BootstrapComponentsBaseUrl, NgBootstrapComponentsBaseUrl } from '../../bootstrap-base-urls';

export const BtnMenuItem: LibraryItem[] = [{
    id: LibraryItemIds.ButtonMenuItem,
    title: 'Menu button',
    type: LibraryItemType.html,
    exampleHtml: getExampleHtml(),
    codeHtml: getCodeHtml(),
    documentationHtml: getDocumentationHtml()
}];


function getExampleHtml(): string {
    return `<p class="mb-4">
    <a href="/developer/components/buttons" class="btn fhi-btn-menu-item">
        <i class="icon-population"></i>
        <span class="btn__text">Menyknapp</span>
    </a>
</p>

<p>
    Aktivt meny-element:<br>
    <a href="/developer/components/buttons" class="btn fhi-btn-menu-item fhi-btn-menu-item--active">
        <i class="icon-muscle"></i>
        <span class="btn__text">Menyknapp</span>
    </a>
</p>`;
}

/*
 * Return empty string to use a copy of exampleHtml as codeHtml.
 * Return null to remove Code from library-item.
 */
function getCodeHtml(): string | null {
    return `<a href="/url" class="btn fhi-btn-menu-item">
    <i class="icon-population"></i>
    <span class="btn__text">Menyknapp</span>
</a>

<a href="/url" class="btn fhi-btn-menu-item fhi-btn-menu-item--active">
    <i class="icon-muscle"></i>
    <span class="btn__text">Menyknapp</span>
</a>`;
}

/*
 * Return null to remove Code from library-item.
 */
function getDocumentationHtml(): string | null {
    return null;
}
