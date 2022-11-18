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
  [labelForId]="'navn-1'"
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
  return `
<p>
  Multiselect er bygget på
  <a href="https://www.npmjs.com/package/@ng-select/ng-select">Angular ng-select</a>,
  og for å ta den i bruk i en app må en legge til
  <a href="https://www.npmjs.com/package/@folkehelseinstituttet/angular-components">@folkehelseinstituttet/angular-components</a>
  som en "dependency".
</p>
<p>
  Multiselect er en "wrapper" for ng-select, med sitt eget begrensede API:
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
      <tr>
        <th>1202</th>
        <td>Birger Henrik</td>
        <td>Tybring-Gjedde Olssen</td>
        <td>Assistant</td>
      </tr>
    </tbody>
  </table>
</div>`;
}
