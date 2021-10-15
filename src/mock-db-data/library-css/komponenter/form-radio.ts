import { LibraryExample } from 'src/app/shared/models/library-example.model';
import { LibraryMenuLevel2Categories } from 'src/app/_felles/konstanter/library-menu-level-2-categories';

const categoryNames = LibraryMenuLevel2Categories.cssKomponentCategories;

export const FormRadio: LibraryExample[] = [{
  title: 'Radioknapp',
  exampleHtml: `
<div class="form-check mb-2">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="customRadio1">
  <label class="form-check-label" for="customRadio1">
    Label for radio
  </label>
</div>
<div class="form-check mb-2">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="customRadio2" checked>
  <label class="form-check-label" for="customRadio2">
    Label for checked radio
  </label>
</div>
<div class="form-check mb-2">
  <input class="form-check-input" type="radio" name="flexRadioDefault2" id="customRadio3" disabled>
  <label class="form-check-label" for="customRadio3">
    Disabled radio
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="flexRadioDefault2" id="customRadio4" checked disabled>
  <label class="form-check-label" for="customRadio4">
    Checked disabled radio
  </label>
</div>
`,
  exampleMarkdown: `
<div class="form-check">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="radioInput">
  <label class="form-check-label" for="radioInput">
    Label for radio
  </label>
</div>
`,
  category: categoryNames.skjema
}];
