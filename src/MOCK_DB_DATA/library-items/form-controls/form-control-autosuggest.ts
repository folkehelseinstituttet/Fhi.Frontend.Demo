import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemsSharedData as ITEMS } from '../library-items-shared-data';

export const FormControlAutosuggest: LibraryItem[] = [{
  id: ITEMS.FormControlAutosuggest.id,
  title: ITEMS.FormControlAutosuggest.title,
  type: LibraryItemType.angular,
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
  description="Velg/søk etter bilmerke"
  [items]="cars"
  label="Biler"
  labelForId="biler-1"
  notFoundText="Ingen treff"
  placeholder="Søk"
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
  Autosuggest er en wrapper for <i>ng&#45;select</i>, med sitt eget begrensede API:
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
        <th>[items]</th>
        <td><code>Array&lt;FhiAutosuggestItem&gt;</code></td>
        <td><code>[]</code></td>
        <td>yes</td>
        <td>Items array (same as in <i>ng&#45;select</i> except for item type <code>FhiAutosuggestItem</code>).</td>
      </tr>
      <tr>
        <th>labelForId</th>
        <td><code>string</code></td>
        <td><code>undefined</code></td>
        <td>no</td>
        <td>Id to associate control with label (same as in <i>ng&#45;select</i>).</td>
      </tr>
      <tr>
        <th>placeholder</th>
        <td><code>string</code></td>
        <td><code>""</code></td>
        <td>no</td>
        <td>Placeholder text (same as in <i>ng&#45;select</i>).</td>
      </tr>
      <tr>
        <th>description</th>
        <td><code>string</code></td>
        <td><code>undefined</code></td>
        <td>no</td>
        <td>Description below the label (custom for FhiAutosuggest).</td>
      </tr>
      <tr>
        <th>label</th>
        <td><code>string</code></td>
        <td><code>Label</code></td>
        <td>yes</td>
        <td>Label above the <i>ng&#45;select</i> field (custom for FhiAutosuggest).</td>
      </tr>
      <tr>
        <th>notFoundText</th>
        <td><code>string</code></td>
        <td><code>"Ingen resultater funnet"</code></td>
        <td>no</td>
        <td>What is shown in the drowpdown list if search does not match any items (same as in <i>ng&#45;select</i>).</td>
      </tr>
      <tr>
        <th>[(selectedItem)]</th>
        <td><code>number</code></td>
        <td><code>null</code></td>
        <td>yes</td>
        <td>A two way binding to access <i>ng&#45;select</i>'s <code>ngModel</code></td>
      </tr>
    </tbody>
  </table>
</div>`;
}