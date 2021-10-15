import { LibraryExample } from 'src/app/shared/models/library-example.model';
import { LibraryMenuLevel2Categories } from 'src/app/_felles/konstanter/library-menu-level-2-categories';

const categoryNames = LibraryMenuLevel2Categories.cssKomponentCategories;

export const FhiBtnSecondary: LibraryExample[] = [{
  title: 'Sekundærknapp',
  exampleHtml: `
<div class="d-flex flex-column flex-lg-row mb-4 mb-lg-0">
  <button type="button" class="btn btn-sm fhi-btn-secondary mb-3 me-3">Liten, 120px</button>
  <button type="button" class="btn btn-md fhi-btn-secondary mb-3 me-3">Standard, 170px</button>
  <button type="button" class="btn btn-lg fhi-btn-secondary mb-3">Lang, 280px</button>
</div>
<div class="d-flex flex-column flex-lg-row">
  <button type="button" class="btn btn-sm fhi-btn-outline-secondary mb-3 mb-lg-0 me-3">Liten, 120px</button>
  <button type="button" class="btn btn-md fhi-btn-outline-secondary mb-3 mb-lg-0 me-3">Standard, 170px</button>
  <button type="button" class="btn btn-lg fhi-btn-outline-secondary">Lang, 280px</button>
</div>`,
  exampleMarkdown: `
<button type="button" class="btn btn-sm fhi-btn-secondary">Liten, 120px</button>
<button type="button" class="btn btn-md fhi-btn-secondary">Standard, 170px</button>
<button type="button" class="btn btn-lg fhi-btn-secondary">Lang, 280px</button>

<button type="button" class="btn btn-sm fhi-btn-outline-secondary">Liten, 120px</button>
<button type="button" class="btn btn-md fhi-btn-outline-secondary">Standard, 170px</button>
<button type="button" class="btn btn-lg fhi-btn-outline-secondary">Lang, 280px</button>`,
  category: categoryNames.knapper
}];
