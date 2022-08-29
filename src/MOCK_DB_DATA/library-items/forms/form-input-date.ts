import { LibraryItem, LibraryItemType } from 'src/app/views/shared/library/models/library-item.model';

export const DateInput: LibraryItem[] = [{
  id: 'date',
  title: 'Date',
  type: LibraryItemType.html,
  exampleHtml: getExampleHtml(),
  codeHtml: getCodeHtml(),
  documentationHtml: getDocumentationHtml()
}];

function getExampleHtml(): string {
  return `
<div class="row">
  <div class="col-auto">
    <label for="FormInputDate1" class="form-label">Date from:</label><br>
    <input type="date" id="FormInputDate1" class="form-control" pattern="\d{4}-\d{2}-\d{2}">
  </div>
  <div class="col">
    <label for="FormInputDate2" class="form-label">Date to:</label><br>
    <input type="date" id="FormInputDate2" class="form-control" pattern="\d{4}-\d{2}-\d{2}">
  </div>`;
}

/*
 * Return empty string to use a copy of exampleHtml as codeHtml.
 * Return null to remove Code from library-item.
 */
function getCodeHtml(): string | null {
  return `
<div class="form-check">
  <input class="form-check-input" type="checkbox" value="" id="customCheck">
  <label class="form-check-label" for="customCheck">
    Label for checkbox
  </label>
</div>`;
}

/*
 * Return null to remove Code from library-item.
 */
function getDocumentationHtml(): string | null {
  return null;
}
