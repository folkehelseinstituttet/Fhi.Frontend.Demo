import { LibraryExample } from 'src/app/shared/models/library-example.model';
import { LibraryMenuLevel2Categories } from 'src/app/_common/constants/library-menu-level-2-categories';

const categoryNames = LibraryMenuLevel2Categories.cssComponentCategories;

export const FhiBtnRounded: LibraryExample[] = [{
  title: 'Rounded button',
  exampleHtml: `
<div class="d-flex flex-column flex-lg-row mb-4 mb-lg-0">
  <button type="button" class="btn btn-sm fhi-btn-round mb-3 me-3">Small, 120px</button>
  <button type="button" class="btn btn-md fhi-btn-round mb-3 me-3">Standard, 170px</button>
  <button type="button" class="btn btn-lg fhi-btn-round mb-3">Large, 280px</button>
</div>`,
  exampleMarkdown: `
<button type="button" class="btn btn-sm fhi-btn-round">Small, 120px</button>
<button type="button" class="btn btn-md fhi-btn-round">Standard, 170px</button>
<button type="button" class="btn btn-lg fhi-btn-round">Large, 280px</button>
`,
  category: categoryNames.buttons
}];
