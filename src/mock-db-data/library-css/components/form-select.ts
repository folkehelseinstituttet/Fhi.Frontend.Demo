import { LibraryExample } from 'src/app/shared/models/library-example.model';
import { LibraryMenuLevel2Categories } from 'src/app/_common/constants/library-menu-level-2-categories';

const categoryNames = LibraryMenuLevel2Categories.cssComponentCategories;

export const FormSelect: LibraryExample[] = [{
  title: 'Select',
  exampleHtml: `
<!-- optional outer div for grouping -->
<div>
  <label for="FormSelect" class="form-label">Select w/options</label>
  <select class="form-select" id="FormSelect">
    <option>Open to make selection</option>
    <option value="1">1</option>
    <option value="2">2</option>
  </select>
</div>
`,
  category: categoryNames.forms
}];
