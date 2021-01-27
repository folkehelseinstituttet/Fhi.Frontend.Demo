import { LibraryExample } from 'src/app/shared/models/library-example.model';
import { LibraryMenuLevel2Categories } from 'src/app/_felles/konstanter/library-menu-level-2-categories';

const categoryNames = LibraryMenuLevel2Categories.cssKomponentCategories;

export const FormSelect: LibraryExample[] = [{
  title: 'Nedtrekksliste (select)',
  exampleHtml: `
<div class="form-group">
  <label for="FormSelect">Nedtrekksliste</label>
  <select class="form-control" id="FormSelect">
    <option></option>
    <option>1</option>
    <option>2</option>
  </select>
</div>
`,
  category: categoryNames.skjema
}];
