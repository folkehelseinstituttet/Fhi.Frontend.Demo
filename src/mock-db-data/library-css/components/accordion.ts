import { LibraryItem, LibraryItemType } from 'src/app/views/shared/library/models/library-item.model';
import { LibraryMenuLevel2Categories } from 'src/app/_common/constants/library-menu-level-2-categories';
import { BootstrapBaseUrl, NgBootstrapBaseUrl } from 'src/app/library-css/constants/bootstrap-base-urls';

const categoryNames = LibraryMenuLevel2Categories.cssComponentCategories;

const itemTitle = 'Accordion';

export const Accordion: LibraryItem[] = [{
  title: itemTitle,
  type: LibraryItemType.ngBootstrap,
  codeHtml: `
<ngb-accordion [closeOthers]="true" #acc="ngbAccordion"
               class="accordion-flush" activeIds="custom-id-0">
  <ngb-panel id="custom-id-0" title="Item #1">
    <ng-template ngbPanelContent>
      <p>Item #1 content</p>
    </ng-template>
  </ngb-panel>
  <ngb-panel id="custom-id-1" title="Item #2">
    <ng-template ngbPanelContent>
      <p>Item #2 content</p>
    </ng-template>
  </ngb-panel>
  <ngb-panel id="custom-id-2" title="Item #3">
    <ng-template ngbPanelContent>
      <p>Item #3 content</p>
    </ng-template>
  </ngb-panel>
</ngb-accordion>`,
  documentationHtml: `
<p>
  Bootstrap documentation for
  <a href="${BootstrapBaseUrl}/${itemTitle.toLocaleLowerCase()}">Accordion</a>
</p>
<p>
  The accordion is implemented as a
  <a href="${NgBootstrapBaseUrl}/${itemTitle.toLocaleLowerCase()}">ngBootstrap Accordion</a>
  in the FHI Designsystem.
</p>
<p>
  If you use another Javascript framework, you will have to find a suitable 3. party library.
</p>`,
  category: categoryNames.structuredContent
}];
