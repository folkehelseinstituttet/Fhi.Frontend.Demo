import { LibraryExample } from 'src/app/shared/models/library-example.model';
import { LibraryMenuLevel2Categories } from 'src/app/_common/constants/library-menu-level-2-categories';

const categoryNames = LibraryMenuLevel2Categories.cssComponentCategories;

export const FormInputValidation: LibraryExample[] = [{
  title: 'Text input w/validation',
  exampleHtml: `
<div>
  <label for="FormInputValidation" class="form-label">Text input w/validation</label>
  <input type="text" id="FormInputValidation" class="form-control is-invalid" placeholder="">
  <div class="invalid-feedback">Understandable error message.</div>
</div>
`,
exampleMarkdown: `
<!-- optional outer div for grouping -->
<div>
  <label for="FormInputValidation" class="form-label">Text input w/validation</label>
  <input type="text" id="FormInputValidation" class="form-control is-invalid" placeholder="">
  <div class="invalid-feedback">Understandable error message.</div>
</div>
`,
  category: categoryNames.forms
}];
