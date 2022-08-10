import { LibraryExample } from 'src/app/shared/models/library-example.model';
import { LibraryMenuLevel2Categories } from 'src/app/_common/constants/library-menu-level-2-categories';
import { BootstrapBaseUrl, NgBootstrapBaseUrl } from 'src/app/_common/constants/base-urls-bootstrap-doc';

const categoryNames = LibraryMenuLevel2Categories.cssComponentCategories;

const exampleTitle = 'Accordion';

export const Accordion: LibraryExample[] = [{
  title: exampleTitle,
  codeMarkdown: `
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
  <a href="${BootstrapBaseUrl}/${exampleTitle.toLocaleLowerCase}">Accordion</a>
</p>
<p>
  The accordion is implemented as a
  <a href="${NgBootstrapBaseUrl}/${exampleTitle.toLocaleLowerCase}">ngBootstrap Accordion</a>
  in the FHI Designsystem.
</p>
<p>
  If you use another Javascript framework, you will have to find a suitable 3. party library.
</p>`,
  category: categoryNames.structuredContent
}];
