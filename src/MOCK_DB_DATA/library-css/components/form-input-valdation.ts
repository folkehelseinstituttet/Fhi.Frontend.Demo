import { LibraryItem, LibraryItemType } from 'src/app/views/shared/library/models/library-item.model';

export const FormInputValidation: LibraryItem[] = [{
  title: 'Text input w/validation',
  type: LibraryItemType.html,
  exampleHtml: `
<div>
  <label for="FormInputValidation" class="form-label">Text input w/validation</label>
  <input type="text" id="FormInputValidation" class="form-control is-invalid" placeholder="">
  <div class="invalid-feedback">Understandable error message.</div>
</div>
`,
codeHtml: `
<!-- optional outer div for grouping -->
<div>
  <label for="FormInputValidation" class="form-label">Text input w/validation</label>
  <input type="text" id="FormInputValidation" class="form-control is-invalid" placeholder="">
  <div class="invalid-feedback">Understandable error message.</div>
</div>`
}];
