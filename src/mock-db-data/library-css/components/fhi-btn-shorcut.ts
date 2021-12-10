import { LibraryExample } from 'src/app/shared/models/library-example.model';
import { LibraryMenuLevel2Categories } from 'src/app/_common/constants/library-menu-level-2-categories';

const categoryNames = LibraryMenuLevel2Categories.cssComponentCategories;

export const FhiBtnShortcut: LibraryExample[] = [{
  title: 'Snarveiknapp',
  exampleHtml: `
For "Snarveiknapp" se
<a href="../../angular/font-awesome#snarveiknapp">
  ../../angular/font-awesome#snarveiknapp
</a>
`,
  exampleMarkdown: `
<!-- NA -->
`,
  category: categoryNames.buttons
}];
