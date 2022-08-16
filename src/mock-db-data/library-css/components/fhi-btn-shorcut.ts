import { LibraryItem, LibraryItemType } from 'src/app/shared/models/library-item.model';
import { LibraryMenuLevel2Categories } from 'src/app/_common/constants/library-menu-level-2-categories';

const categoryNames = LibraryMenuLevel2Categories.cssComponentCategories;

export const FhiBtnShortcut: LibraryItem[] = [{
  title: 'Snarveiknapp',
  type: LibraryItemType.html,
  exampleHtml: `
For "Snarveiknapp" se
<a href="../../angular/font-awesome#snarveiknapp">
  ../../angular/font-awesome#snarveiknapp
</a>
`,
  codeHtml: `
<!-- NA -->
`,
  category: categoryNames.buttons
}];
