import { LibraryItemIds } from '../library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';

export const AdvancedSelectMultiselect: LibraryItem[] = [{
  id: LibraryItemIds.AdvancedSelectMultiselect,
  title: 'Advanced select - multiselect',
  type: LibraryItemType.fhiAngular,
  exampleHtml: getExampleHtml(),
  codeHtml: getCodeHtml(),
  documentationHtml: getDocumentationHtml()
}];


/*
 * Return value is ignored if LibraryItemType is not html
 */
function getExampleHtml(): string {
  return `
<fhi-multiselect
  [description]="'Velg/søk etter navn'"
  [forId]="'navn-1'"
  [items]="people"
  [label]="'Navn'"
  [placeholder]="'Søk'"
  [(selectedItems)]="selectedPeople">
</fhi-multiselect>`;
}

/*
 * Return empty string to use a copy of exampleHtml as codeHtml.
 * Return null to remove Code from library-item.
 */
function getCodeHtml(): string | null {
  return ``;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
  return null;
}
