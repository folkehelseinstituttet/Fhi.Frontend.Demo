import { LibraryItem, LibraryItemType } from 'src/app/views/shared/library/models/library-item.model';
import { BootstrapComponentsBaseUrl, NgBootstrapComponentsBaseUrl } from '../../bootstrap-base-urls';

export const NavigationTile: LibraryItem[] = [{
    id: 'navigationtile',
    title: 'Navigation tile',
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
<div class="row gx-3 gx-sm-5">
    <div class="col-auto col-sm-12 col-xl-6 gx-3 gx-sm-5 gy-3 gy-sm-5">
        <a href="/developer/components/navigationtile" class="fhi-tile">
            <span class="fhi-tile__icon">
                <i class="icon-environment"></i>
            </span>

            <p class="fhi-tile__heading">Tile Heading</p>

            <p class="fhi-tile__description">Short descriptive text, that stretches no longer than over three lines.</p>
        </a>
    </div>
</div>
`;
}

/*
 * Return empty string to use a copy of exampleHtml as codeHtml.
 * Return null to remove Code from library-item.
 */
function getCodeHtml(): string | null {
    return `
<a href="/url" class="fhi-tile">
    <span class="fhi-tile__icon">
        <i class="icon-environment"></i>
    </span>

    <p class="fhi-tile__heading">Tile Heading</p>

    <p class="fhi-tile__description">Short descriptive text, that stretches no longer than over three lines.</p>
</a>`;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
    return null;
}
