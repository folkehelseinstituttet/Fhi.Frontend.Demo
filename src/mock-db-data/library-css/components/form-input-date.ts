import { LibraryExample } from 'src/app/shared/models/library-example.model';
import { LibraryMenuLevel2Categories } from 'src/app/_common/constants/library-menu-level-2-categories';

const categoryNames = LibraryMenuLevel2Categories.cssComponentCategories;

export const FormInputDate: LibraryExample[] = [{
  title: 'Date input',
  exampleHtml: `
<div class="row">
  <div class="col-6">
    <label for="FormInputDate1" class="form-label">Date from:</label>
    <input type="date" id="FormInputDate1" class="form-control" placeholder="Regular text input">
  </div>
  <div class="col-6">
    <label for="FormInputDate2" class="form-label">Date to:</label>
    <input type="date" id="FormInputDate2" class="form-control" placeholder="Regular text input">
  </div>
</div>
`,
  category: categoryNames.forms
}];
