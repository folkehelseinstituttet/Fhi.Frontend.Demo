import { LibraryExample } from 'src/app/shared/models/library-example.model';
import { LibraryMenuLevel2Categories } from 'src/app/_felles/konstanter/library-menu-level-2-categories';

const categoryNames = LibraryMenuLevel2Categories.cssKomponentCategories;

export const FormRadio: LibraryExample[] = [{
  title: 'Radioknapp',
  exampleHtml: `
<div class="form-check mb-1">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="customRadio1">
  <label class="form-check-label" for="customRadio1">Default radio</label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="customRadio2" checked>
  <label class="form-check-label" for="customRadio2">Default checked radio</label>
</div>
`,
  exampleMarkdown: `
<div class="form-check">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="customRadio1">
  <label class="form-check-label" for="customRadio1">Default radio</label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="customRadio2" checked>
  <label class="form-check-label" for="customRadio2">Default checked radio</label>
</div>
`,
  category: categoryNames.skjema
}];
