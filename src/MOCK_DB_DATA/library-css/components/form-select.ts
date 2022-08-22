import { LibraryItem, LibraryItemType } from 'src/app/views/shared/library/models/library-item.model';

export const FormSelect: LibraryItem[] = [{
  title: 'Select',
  type: LibraryItemType.html,
  exampleHtml: `
<!-- optional outer div for grouping -->
<div>
  <label for="FormSelect" class="form-label">Select w/options</label>
  <select class="form-select" id="FormSelect">
    <option>Open to make selection</option>
    <option value="1">1</option>
    <option value="2">2</option>
  </select>
</div>`
}];
