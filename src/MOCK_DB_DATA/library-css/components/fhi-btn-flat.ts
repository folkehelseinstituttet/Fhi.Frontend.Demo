import { LibraryItem, LibraryItemType } from 'src/app/views/shared/library/models/library-item.model';

export const FhiBtnFlat: LibraryItem[] = [{
  title: 'Transparent button',
  type: LibraryItemType.html,
  exampleHtml: `
<div class="d-flex flex-column flex-lg-row mb-4 mb-lg-0">
  <button type="button" class="btn btn-sm fhi-btn-flat mb-3 me-3">Small, 120px</button>
  <button type="button" class="btn btn-md fhi-btn-flat mb-3 me-3">Standard, 170px</button>
  <button type="button" class="btn btn-lg fhi-btn-flat mb-3">Large, 280px</button>
</div>
<div>
  <button type="button" class="btn fhi-btn-flat">Dynamic width</button>
</div>`,
  codeHtml: `
<button type="button" class="btn btn-sm fhi-btn-flat">Small, 120px</button>
<button type="button" class="btn btn-md fhi-btn-flat">Standard, 170px</button>
<button type="button" class="btn btn-lg fhi-btn-flat">Large, 280px</button>

<button type="button" class="btn fhi-btn-flat">Dynamic width</button>
`
}];
