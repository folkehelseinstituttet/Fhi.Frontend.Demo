import { LibraryItemIds } from 'src/app/library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { BootstrapComponentsBaseUrl, NgBootstrapComponentsBaseUrl } from '../../bootstrap-base-urls';

export const TagMultipleSelection: LibraryItem[] = [{
  id: LibraryItemIds.TagMultipleSelection,
  title: 'Tag - multiple selection',
  type: LibraryItemType.html,
  exampleHtml: getExampleHtml(),
  codeHtml: getCodeHtml(),
  documentationHtml: getDocumentationHtml()
}];


/*
 * Return value is ignored if LibraryItemType is not html
 */
function getExampleHtml(): string {
  return `
<div class="fhi-tag-selector">
  <input class="fhi-tag-selector__input" type="checkbox" id="mltpl-opt-1">
  <label class="fhi-tag-selector__label" for="mltpl-opt-1"><i class="icon-check"></i> Valg 1</label>
</div>

<div class="fhi-tag-selector">
  <input class="fhi-tag-selector__input" type="checkbox" id="mltpl-opt-2">
  <label class="fhi-tag-selector__label" for="mltpl-opt-2"><i class="icon-check"></i> Valg 2</label>
</div>

<div class="fhi-tag-selector">
  <input class="fhi-tag-selector__input" type="checkbox" id="mltpl-opt-3">
  <label class="fhi-tag-selector__label" for="mltpl-opt-3"><i class="icon-check"></i> Valg 3</label>
</div>
`;
}

/*
 * Return empty string to use a copy of exampleHtml as codeHtml.
 * Return null to remove Code from library-item.
 */
function getCodeHtml(): string | null {
  return ``;
}

/*
 * Return null to remove Code from library-item.
 */
function getDocumentationHtml(): string | null {
  return null;
}
