import { LibraryItemIds } from 'src/app/views/shared/library/library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/library/models/library-item.model';
import { BootstrapComponentsBaseUrl, NgBootstrapComponentsBaseUrl } from '../../bootstrap-base-urls';

export const BtnLink: LibraryItem[] = [{
    id: LibraryItemIds.ButtonLink,
    title: 'Transparent button',
    type: LibraryItemType.html,
    exampleHtml: getExampleHtml(),
    codeHtml: getCodeHtml(),
    documentationHtml: getDocumentationHtml()
}];


function getExampleHtml(): string {
    return `
<div>
    <button type="button" class="btn fhi-btn-flat">Dynamic width</button>
</div>
<div>
    <button type="button" class="btn btn-link">Button link</button>
</div>`;
}

/*
 * Return empty string to use a copy of exampleHtml as codeHtml.
 * Return null to remove Code from library-item.
 */
function getCodeHtml(): string | null {
    return `
<button type="button" class="btn btn-sm fhi-btn-flat">Small, 120px</button>
<button type="button" class="btn btn-md fhi-btn-flat">Standard, 170px</button>
<button type="button" class="btn btn-lg fhi-btn-flat">Large, 280px</button>

<button type="button" class="btn fhi-btn-flat">Dynamic width</button>`;
}

/*
 * Return null to remove Code from library-item.
 */
function getDocumentationHtml(): string | null {
    return null;
}

