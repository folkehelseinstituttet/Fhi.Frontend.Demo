import { LibraryItem, LibraryItemType } from 'src/app/views/shared/library/models/library-item.model';

export const FormInput: LibraryItem[] = [{
  title: 'Text input',
  type: LibraryItemType.html,
  exampleHtml: `
<label for="FormInput" class="form-label">Text input</label>
<input type="text" id="FormInput" class="form-control" placeholder="Regular text input">
`,
codeHtml: `
<!-- optional outer div for grouping -->
<div>
  <label for="FormInput" class="form-label">Text input</label>
  <input type="text" id="FormInput" class="form-control" placeholder="Regular text input">
</div>`
}];
