import { LibraryExample } from 'src/app/shared/models/library-example.model';
import { LibraryMenuLevel2Categories } from 'src/app/_common/constants/library-menu-level-2-categories';
import { BootstrapBaseUrl, NgBootstrapBaseUrl } from 'src/app/library-css/constants/bootstrap-base-urls';
import { LibraryItemType } from 'src/app/library-css/constants/library-item-type';

const categoryNames = LibraryMenuLevel2Categories.cssComponentCategories;

const itemTitle = 'Toast';

export const Toast: LibraryExample[] = [{
  title: itemTitle,
  type: LibraryItemType.ngBootstrap,
  codeMarkdown: `
<ngb-toast [autohide]="false">
  I am a simple static toast.
</ngb-toast>

<ngb-toast *ngIf="show" header="Hello" [autohide]="false" (hidden)="show=false">
  I am a simple static toast with a header.
</ngb-toast>
`,
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
