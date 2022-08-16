import { LibraryItem, LibraryItemType } from 'src/app/shared/models/library-item.model';
import { LibraryMenuLevel2Categories } from 'src/app/_common/constants/library-menu-level-2-categories';

const categoryNames = LibraryMenuLevel2Categories.cssComponentCategories;

export const FormInput: LibraryItem[] = [{
  title: 'Text input',
  type: LibraryItemType.html,
  exampleHtml: `
<label for="FormInput" class="form-label">Text input</label>
<input type="text" id="FormInput" class="form-control" placeholder="Regular text input">
`,
codeHtml: `
<!-- optional outer div for grouping -->
<div>
  <label for="FormInput" class="form-label">Text input</label>
  <input type="text" id="FormInput" class="form-control" placeholder="Regular text input">
</div>
`,
  category: categoryNames.forms
}];
