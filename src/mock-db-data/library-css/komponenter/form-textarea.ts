import { LibraryExample } from 'src/app/shared/models/library-example.model';
import { LibraryMenuLevel2Categories } from 'src/app/_felles/konstanter/library-menu-level-2-categories';

const categoryNames = LibraryMenuLevel2Categories.cssKomponentCategories;

export const FormTextarea: LibraryExample[] = [{
  title: 'Tekstfelt flere linjer',
  exampleHtml: `
<div class="form-group">
  <label for="exampleFormControlTextarea1">Example textarea</label>
  <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
</div>
`,
  category: categoryNames.skjema
}];
