import { LibraryExample } from 'src/app/shared/models/library-example.model';
import { LibraryMenuLevel2Categories } from 'src/app/_common/constants/library-menu-level-2-categories';

const categoryNames = LibraryMenuLevel2Categories.cssComponentCategories;

export const FormInput: LibraryExample[] = [{
  title: 'Text input',
  exampleHtml: `
<label for="FormInput" class="form-label">Text input</label>
<input type="text" id="FormInput" class="form-control" placeholder="Regular text input">
`,
exampleMarkdown: `
<!-- optional outer div for grouping -->
<div>
  <label for="FormInput" class="form-label">Text input</label>
  <input type="text" id="FormInput" class="form-control" placeholder="Regular text input">
</div>
`,
  category: categoryNames.forms
}];
