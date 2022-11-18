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
  [labelForId]="'biler-1'"
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
  return `
<p>
  Autosuggest er bygget på
  <a href="https://www.npmjs.com/package/@ng-select/ng-select">Angular ng-select</a>,
  og for å ta den i bruk i en app må en legge til
  <a href="https://www.npmjs.com/package/@folkehelseinstituttet/angular-components">@folkehelseinstituttet/angular-components</a>
  som en "dependency".
</p>
<p>
  Autosuggest er en wrapper for ng-select, med sitt eget begrensede API:
</p>
<div class="table-responsive">
  <table class="table table-striped">
    <thead>
      <tr>
        <th scope="col">Input</th>
        <th scope="col">Type</th>
        <th scope="col">Default</th>
        <th scope="col">Required</th>
        <th scope="col">Description</th>
      </tr>
    </thead>
    <tbody>
    </tbody>
  </table>
</div>`;
}
