import { LibraryExample } from 'src/app/shared/models/library-example.model';
import { LibraryMenuLevel2Categories } from 'src/app/_felles/konstanter/library-menu-level-2-categories';

const categoryNames = LibraryMenuLevel2Categories.cssKomponentCategories;

export const FhiBtnPrimary: LibraryExample[] = [{
  title: 'Primærknapp',
  exampleHtml: `
<div class="d-flex flex-column flex-lg-row mb-4 mb-lg-0">
  <button type="button" class="btn btn-sm fhi-btn-primary mb-3 me-3">Liten, 120px</button>
  <button type="button" class="btn btn-md fhi-btn-primary mb-3 me-3">Standard, 170px</button>
  <button type="button" class="btn btn-lg fhi-btn-primary mb-3">Lang, 280px</button>
</div>
<div class="d-flex flex-column flex-lg-row">
  <button type="button" class="btn btn-sm fhi-btn-outline-primary mb-3 mb-lg-0 me-3">Liten, 120px</button>
  <button type="button" class="btn btn-md fhi-btn-outline-primary mb-3 mb-lg-0 me-3">Standard, 170px</button>
  <button type="button" class="btn btn-lg fhi-btn-outline-primary">Lang, 280px</button>
</div>`,
  exampleMarkdown: `
<button type="button" class="btn btn-sm fhi-btn-primary">Liten, 120px</button>
<button type="button" class="btn btn-md fhi-btn-primary">Standard, 170px</button>
<button type="button" class="btn btn-lg fhi-btn-primary">Lang, 280px</button>

<button type="button" class="btn btn-sm fhi-btn-outline-primary">Liten, 120px</button>
<button type="button" class="btn btn-md fhi-btn-outline-primary">Standard, 170px</button>
<button type="button" class="btn btn-lg fhi-btn-outline-primary">Lang, 280px</button>`,
  category: categoryNames.knapper
}];
