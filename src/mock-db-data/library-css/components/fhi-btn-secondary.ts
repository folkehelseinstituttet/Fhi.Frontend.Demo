import { LibraryItem } from 'src/app/shared/models/library-item.model';
import { LibraryMenuLevel2Categories } from 'src/app/_common/constants/library-menu-level-2-categories';

const categoryNames = LibraryMenuLevel2Categories.cssComponentCategories;

export const FhiBtnSecondary: LibraryItem[] = [{
  title: 'Secondary button',
  exampleHtml: `
<div class="d-flex flex-column flex-lg-row mb-4 mb-lg-0">
  <button type="button" class="btn btn-sm fhi-btn-secondary mb-3 me-3">Small, 120px</button>
  <button type="button" class="btn btn-md fhi-btn-secondary mb-3 me-3">Standard, 170px</button>
  <button type="button" class="btn btn-lg fhi-btn-secondary mb-3">Large, 280px</button>
</div>
<div class="d-flex flex-column flex-lg-row">
  <button type="button" class="btn btn-sm fhi-btn-outline-secondary mb-3 mb-lg-0 me-3">Small, 120px</button>
  <button type="button" class="btn btn-md fhi-btn-outline-secondary mb-3 mb-lg-0 me-3">Standard, 170px</button>
  <button type="button" class="btn btn-lg fhi-btn-outline-secondary">Large, 280px</button>
</div>`,
  codeHtml: `
<button type="button" class="btn btn-sm fhi-btn-secondary">Small, 120px</button>
<button type="button" class="btn btn-md fhi-btn-secondary">Standard, 170px</button>
<button type="button" class="btn btn-lg fhi-btn-secondary">Large, 280px</button>

<button type="button" class="btn btn-sm fhi-btn-outline-secondary">Small, 120px</button>
<button type="button" class="btn btn-md fhi-btn-outline-secondary">Standard, 170px</button>
<button type="button" class="btn btn-lg fhi-btn-outline-secondary">Large, 280px</button>`,
  category: categoryNames.buttons
}];
