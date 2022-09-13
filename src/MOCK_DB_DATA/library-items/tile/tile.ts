import { LibraryItem, LibraryItemType } from 'src/app/views/shared/library/models/library-item.model';
import { BootstrapComponentsBaseUrl, NgBootstrapComponentsBaseUrl } from '../../bootstrap-base-urls';

export const Tile: LibraryItem[] = [{
    id: 'tile',
    title: 'Tile',
    type: LibraryItemType.html,
    exampleHtml: getExampleHtml(),
    codeHtml: getCodeHtml(),
    documentationHtml: getDocumentationHtml()
}];


/*
 * Return value is ignored if LibraryItemType is not html
 */
function getExampleHtml(): string {
    return `
<a href="/developer/components/tile" class="fhi-tile">
    <span class="fhi-tile__icon">
        <i class="icon-environment"></i>
    </span>

    <h2 class="h3">Tile Heading</h2>

    <p class="fhi-tile__description">Short descriptive text, that stretches no longer than over three lines.</p>
</a>
`;
}

/*
 * Return empty string to use a copy of exampleHtml as codeHtml.
 * Return null to remove Code from library-item.
 */
function getCodeHtml(): string | null {
    return ``;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
    return null;
}
