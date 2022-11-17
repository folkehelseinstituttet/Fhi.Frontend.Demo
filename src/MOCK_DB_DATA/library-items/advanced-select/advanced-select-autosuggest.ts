import { LibraryItemIds } from '../library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';

export const AdvancedSelectAutosuggest: LibraryItem[] = [{
  id: LibraryItemIds.AdvancedSelectAutosuggest,
  title: 'Advanced select - autosuggest',
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
<fhi-autosuggest
  [description]="'Velg/søk etter bilmerke'"
  [forId]="'biler-1'"
  [items]="cars"
  [label]="'Biler'"
  [placeholder]="'Søk'"
  [(selectedItem)]="selectedCar">
</fhi-autosuggest>`;
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
  const apiUrl = 'https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/tree/main/projects/fhi-angular-components/src/lib/fhi-autosuggest/API.md';
  return `
<p>
  Autosuggest er bygget på
  <a href="https://www.npmjs.com/package/@ng-select/ng-select">Angular ng-select</a>
</p>
<p>
  Den er en wrapper for ng-select, med sitt eget begrensede API: <a href="${apiUrl}">FhiAutosuggest API</a>
</p>`;
}
