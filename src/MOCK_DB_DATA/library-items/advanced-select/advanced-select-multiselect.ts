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
  const apiUrl = 'https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/tree/main/projects/fhi-angular-components/src/lib/fhi-multiselect/API.md';
  return `
<p>
  Multiselect er bygget på
  <a href="https://www.npmjs.com/package/@ng-select/ng-select">Angular ng-select</a>
</p>
<p>
  Den er en wrapper for ng-select, med sitt eget begrensede API: <a href="${apiUrl}">FhiMultiselect API</a>
</p>`;
}
