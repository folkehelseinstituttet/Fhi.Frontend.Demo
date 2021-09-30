import { LibraryExample } from 'src/app/shared/models/library-example.model';
import { LibraryMenuLevel2Categories } from 'src/app/_felles/konstanter/library-menu-level-2-categories';

const categoryNames = LibraryMenuLevel2Categories.cssKomponentCategories;

export const FormCheckbox: LibraryExample[] = [{
  title: 'Checkbox',
  exampleHtml: `
<div class="form-check">
  <input class="form-check-input" type="checkbox" value="" id="customCheck1">
  <label class="form-check-label" for="customCheck1">
    Check this custom checkbox
  </label>
</div>

<div class="form-check">
  <input class="form-check-input" type="checkbox" value="" id="customCheck2" checked>
  <label class="form-check-label" for="customCheck2">
    Checked custom checkbox
  </label>
</div>

<div class="custom-control custom-checkbox">
  <input type="checkbox" class="custom-control-input" id="customCheck">
  <label class="custom-control-label" for="customCheck">Check this custom checkbox</label>
</div>

<div class="custom-control custom-checkbox">
  <input type="checkbox" class="custom-control-input" id="customCheck" checked>
  <label class="custom-control-label" for="customCheck">Check this custom checkbox</label>
</div>
`,
  category: categoryNames.skjema
}];
