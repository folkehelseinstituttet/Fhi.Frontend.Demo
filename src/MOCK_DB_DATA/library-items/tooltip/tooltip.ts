import { LibraryItemIds } from 'src/app/views/shared/library/library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/library/models/library-item.model';
import { BootstrapComponentsBaseUrl, NgBootstrapComponentsBaseUrl } from '../../bootstrap-base-urls';

export const Tooltip: LibraryItem[] = [{
  id: LibraryItemIds.Tooltip,
  title: 'Tooltip',
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
<button type="button" class="btn fhi-btn-outline-secondary" ngbTooltip="This is the tooltip.">
  Hover for tooltip
</button>`;
}

/*
 * Return null to remove Code from library-item.
 */
function getDocumentationHtml(): string | null {
  return `
<p>
  Bootstrap documentation for
  <a href="${BootstrapComponentsBaseUrl}/tooltips">Tooltip</a>
</p>
<p>
  The Tooltip is implemented as a
  <a href="${NgBootstrapComponentsBaseUrl}/tooltip">NgBootstrap Tooltip</a>
  in the FHI Designsystem.
</p>
<p>
  If you use another Javascript framework, you will have to find a suitable 3. party library.
</p>`;
}
