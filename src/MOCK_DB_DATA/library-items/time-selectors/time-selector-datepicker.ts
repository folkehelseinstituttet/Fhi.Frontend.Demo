import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemsSharedData as ITEMS } from '../library-items-shared-data';
import { LibraryItemConstants as CONST } from '../library-item-constants';

export const TimeSelectorDatepicker: LibraryItem[] = [{
  id: ITEMS.TimeSelectorDatepicker.id,
  title: ITEMS.TimeSelectorDatepicker.title,
  type: LibraryItemType.angular,
  exampleHtml: getExampleHtml(),
  codeHtml: getCodeHtml(),
  documentationHtml: getDocumentationHtml()
}];


/*
 * Return value is ignored if LibraryItemType is not html
 */
function getExampleHtml(): string {
  return ``;
}

/*
 * Return empty string to use a copy of exampleHtml as codeHtml.
 * Return null to remove Code from library-item.
 */
function getCodeHtml(): string | null {
  return `
<fhi-datepicker [date]="initialDate"
                [minDate]="minDate"
                [maxDate]="maxDate"></fhi-datepicker>
`;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
  return `
<p>
  <a href="${CONST.FhiAngularComponents}/fhi-datepicker">FHI Datepicker</a> er en komponent i <a href="${CONST.FhiAngularComponents}">FHI Angular Components</a>.
</p>
<p>
  Den er basert på <a href="">NgBootstrap Datepicker</a>, og dersom du benytter annet javascript-rammeverk enn Angular må du finne passende tredjepartskomponent.
</p>

<h3 class="mb-5">API</h3>

<h4>Inputs</h4>
<div class="table-responsive mb-5">
  <table class="table">
    <thead>
      <tr>
        <th>Input</th>
        <th>Type</th>
        <th>Default</th>
        <th>Required</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>date</th>
        <td><span class="text-nowrap"><code>string</code></span></td>
        <td>-</td>
        <td>no</td>
        <td>Forhåndsvalgt dato for Datepicker.</td>
      </tr>
      <tr>
        <th>maxDate</th>
        <td><span class="text-nowrap"><code>string</code></span></td>
        <td>-</td>
        <td>no</td>
        <td>Siste dato som kan velges i Datepicker.</td>
      </tr>
      <tr>
        <th>minDate</th>
        <td><span class="text-nowrap"><code>string</code></span></td>
        <td>-</td>
        <td>no</td>
        <td>Første dato som kan velges i Datepicker.</td>
      </tr>
    </tbody>
  </table>
</div>

<h4>Outputs</h4>
<div class="table-responsive">
  <table class="table">
    <thead>
      <tr>
        <th>Output</th>
        <th class="text-nowrap">Event type</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>dateSelected</th>
        <td><code>string</code></td>
        <td>Valgte dato enten fra Datepicker eller direkte input. Dato returneres som ISO 8601 string.</td>
      </tr>
    </tbody>
  </table>
</div>`;
}
