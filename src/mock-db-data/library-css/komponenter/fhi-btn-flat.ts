import { LibraryExample } from 'src/app/shared/models/library-example.model';
import { LibraryMenuLevel2Categories } from 'src/app/_felles/konstanter/library-menu-level-2-categories';

const categoryNames = LibraryMenuLevel2Categories.cssKomponentCategories;

export const FhiBtnFlat: LibraryExample[] = [{
  title: 'Flatknapp',
  exampleHtml: `
<div class="d-flex flex-column flex-lg-row mb-4 mb-lg-0">
  <button type="button" class="btn btn-sm fhi-btn-flat mb-3 me-3">Liten, 120px</button>
  <button type="button" class="btn btn-md fhi-btn-flat mb-3 me-3">Standard, 170px</button>
  <button type="button" class="btn btn-lg fhi-btn-flat mb-3">Lang, 280px</button>
</div>
<div>
  <button type="button" class="btn fhi-btn-flat">Dynamisk bredde</button>
</div>`,
  exampleMarkdown: `
<button type="button" class="btn btn-sm fhi-btn-flat">Liten, 120px</button>
<button type="button" class="btn btn-md fhi-btn-flat">Standard, 170px</button>
<button type="button" class="btn btn-lg fhi-btn-flat">Lang, 280px</button>

<button type="button" class="btn fhi-btn-flat">Dynamisk bredde</button>
`,
  category: categoryNames.knapper
}];
