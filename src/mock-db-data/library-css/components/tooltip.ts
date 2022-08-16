import { LibraryExample } from 'src/app/shared/models/library-example.model';
import { LibraryMenuLevel2Categories } from 'src/app/_common/constants/library-menu-level-2-categories';
import { BootstrapBaseUrl, NgBootstrapBaseUrl } from 'src/app/library-css/constants/bootstrap-base-urls';
import { LibraryItemType } from 'src/app/library-css/constants/library-item-type';

const categoryNames = LibraryMenuLevel2Categories.cssComponentCategories;

const itemTitle = 'Tooltip';

export const Tooltip: LibraryExample[] = [{
  title: itemTitle,
  type: LibraryItemType.ngBootstrap,
  codeHtml: `
<button type="button" class="btn fhi-btn-outline-secondary" ngbTooltip="This is the tooltip.">
  Hover for tooltip
</button>`,

  documentationHtml: `
<p>
  Bootstrap documentation for
  <a href="${BootstrapBaseUrl}/${itemTitle.toLocaleLowerCase()}s">Tooltip</a>
</p>
<p>
  The Tooltip is implemented as a
  <a href="${NgBootstrapBaseUrl}/${itemTitle.toLocaleLowerCase()}">ngBootstrap Tooltip</a>
  in the FHI Designsystem.
</p>
<p>
  If you use another Javascript framework, you will have to find a suitable 3. party library.
</p>`,

  category: categoryNames.widgets
}];
