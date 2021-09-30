import { LibraryExample } from 'src/app/shared/models/library-example.model';
import { LibraryMenuLevel2Categories } from 'src/app/_felles/konstanter/library-menu-level-2-categories';

const categoryNames = LibraryMenuLevel2Categories.cssKomponentCategories;

export const FormRadio: LibraryExample[] = [{
  title: 'Radioknapp',
  exampleHtml: `
<div class="form-check">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
  <label class="form-check-label" for="flexRadioDefault1">Default radio</label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked>
  <label class="form-check-label" for="flexRadioDefault2">Default checked radio</label>
</div>

<div class="custom-control custom-radio mt-2">
  <input type="radio" id="customRadio1" name="customRadio" class="custom-control-input">
  <label class="custom-control-label" for="customRadio1">Toggle this custom radio</label>
</div>
<div class="custom-control custom-radio">
  <input type="radio" id="customRadio2" name="customRadio" class="custom-control-input" checked>
  <label class="custom-control-label" for="customRadio2">Or toggle this other custom radio</label>
</div>
`,
  exampleMarkdown: `
<div class="form-check">
  <input type="radio" id="customRadio1" name="customRadio" class="forrm-check-input">
  <label class="form-check-label" for="customRadio1">Toggle this custom radio</label>
</div>
<div class="form-check">
  <input type="radio" id="customRadio2" name="customRadio" class="forrm-check-input">
  <label class="form-check-label" for="customRadio2">Or toggle this other custom radio</label>
</div>
`,
  category: categoryNames.skjema
}];
