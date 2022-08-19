import { LibraryItem, LibraryItemType } from 'src/app/views/shared/library/models/library-item.model';

export const FormTextarea: LibraryItem[] = [{
  title: 'Textarea',
  type: LibraryItemType.html,
  exampleHtml: `
<div>
  <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
  <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
</div>`,
  codeHtml: `
<!-- optional outer div for grouping -->
<div>
  <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
  <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
</div>`
}];
