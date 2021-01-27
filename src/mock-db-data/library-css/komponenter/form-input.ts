import { LibraryExample } from 'src/app/shared/models/library-example.model';
import { LibraryMenuLevel2Categories } from 'src/app/_felles/konstanter/library-menu-level-2-categories';

const categoryNames = LibraryMenuLevel2Categories.cssKomponentCategories;

export const FormInput: LibraryExample[] = [{
  title: 'Tekstfelt',
  exampleHtml: `
<div class="form-group">
  <label for="FormInput">Tekstfelt</label>
  <input type="text" id="FormInput" class="form-control" placeholder="Standard tekstfelt">
</div>
`,
  category: categoryNames.skjema
}];
