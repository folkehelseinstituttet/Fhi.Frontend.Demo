import { LibraryItem, LibraryItemType } from 'src/app/shared/models/library-item.model';
import { LibraryMenuLevel2Categories } from 'src/app/_common/constants/library-menu-level-2-categories';
import { BootstrapBaseUrl, NgBootstrapBaseUrl } from 'src/app/library-css/constants/bootstrap-base-urls';

const categoryNames = LibraryMenuLevel2Categories.cssComponentCategories;

const itemTitle = 'Toast';

export const Toast: LibraryItem[] = [{
  title: itemTitle,
  type: LibraryItemType.ngBootstrap,
  codeHtml: `
<div class="toast-container">
  <ngb-toast *ngIf="show" header="Toast title" [autohide]="true" (hidden)="show=false">
    Standard toast. This instance is automatically hidden.
  </ngb-toast>
</div>`,

  documentationHtml: `
<p>
  Bootstrap documentation for
  <a href="${BootstrapBaseUrl}/${itemTitle.toLocaleLowerCase()}s">Toast</a>
</p>
<p>
  The toast is implemented as a
  <a href="${NgBootstrapBaseUrl}/${itemTitle.toLocaleLowerCase()}">ngBootstrap Toast</a>
  in the FHI Designsystem.
</p>
<p>
  If you use another Javascript framework, you will have to find a suitable 3. party library.
</p>`,

  category: categoryNames.widgets
}];
