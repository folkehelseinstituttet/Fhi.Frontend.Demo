import { LibraryItem, LibraryItemType } from 'src/app/shared/models/library-item.model';
import { LibraryMenuLevel2Categories } from 'src/app/_common/constants/library-menu-level-2-categories';

const categoryNames = LibraryMenuLevel2Categories.cssComponentCategories;

export const FhiBtnPrimary: LibraryItem[] = [{
  title: 'Primary button',
  type: LibraryItemType.html,
  exampleHtml: `
<div class="d-flex flex-column flex-lg-row mb-4 mb-lg-0">
  <button type="button" class="btn btn-sm fhi-btn-primary mb-3 me-3">Small, 120px</button>
  <button type="button" class="btn btn-md fhi-btn-primary mb-3 me-3">Standard, 170px</button>
  <button type="button" class="btn btn-lg fhi-btn-primary mb-3">Large, 280px</button>
</div>
<div class="d-flex flex-column flex-lg-row">
  <button type="button" class="btn btn-sm fhi-btn-outline-primary mb-3 mb-lg-0 me-3">Small, 120px</button>
  <button type="button" class="btn btn-md fhi-btn-outline-primary mb-3 mb-lg-0 me-3">Standard, 170px</button>
  <button type="button" class="btn btn-lg fhi-btn-outline-primary">Large, 280px</button>
</div>`,
  codeHtml: `
<button type="button" class="btn btn-sm fhi-btn-primary">Small, 120px</button>
<button type="button" class="btn btn-md fhi-btn-primary">Standard, 170px</button>
<button type="button" class="btn btn-lg fhi-btn-primary">Large, 280px</button>

<button type="button" class="btn btn-sm fhi-btn-outline-primary">Small, 120px</button>
<button type="button" class="btn btn-md fhi-btn-outline-primary">Standard, 170px</button>
<button type="button" class="btn btn-lg fhi-btn-outline-primary">Large, 280px</button>`,
  category: categoryNames.buttons
}];
