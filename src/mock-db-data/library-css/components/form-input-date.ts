import { LibraryExample } from 'src/app/shared/models/library-example.model';
import { LibraryMenuLevel2Categories } from 'src/app/_common/constants/library-menu-level-2-categories';

const categoryNames = LibraryMenuLevel2Categories.cssComponentCategories;

export const FormInputDate: LibraryExample[] = [{
  title: 'Date input',
  exampleHtml: `
<div class="row">
  <div class="col-auto">
    <label for="FormInputDate1" class="form-label">Date from:</label><br>
    <input type="date" id="FormInputDate1" class="form-control" pattern="\d{4}-\d{2}-\d{2}">
  </div>
  <div class="col">
    <label for="FormInputDate2" class="form-label">Date to:</label><br>
    <input type="date" id="FormInputDate2" class="form-control" pattern="\d{4}-\d{2}-\d{2}">
  </div>
</div>

<script>
  
</script>
`,
  exampleMarkdown: `
<label for="FormInputDate1" class="form-label">Date from:</label><br>
<input type="date" id="FormInputDate1" class="form-control" pattern="\d{4}-\d{2}-\d{2}">
`,
  category: categoryNames.forms
}];
