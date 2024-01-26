import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemsSharedData as ITEMS } from '../library-items-shared-data';
import { LibraryItemConstants as CONST } from '../library-item-constants';

export const TableRowspan: LibraryItem[] = [
  {
    id: ITEMS.TableRowspan.id,
    title: ITEMS.TableRowspan.title,
    type: LibraryItemType.html,
    exampleHtml: getExampleHtml(),
    codeHtml: getCodeHtml(),
    documentationHtml: getDocumentationHtml(),
  },
];

/*
 * Return value is ignored if LibraryItemType is not html
 */
function getExampleHtml(): string {
  return `
<div class="table-responsive">
  <table class="table table-sm table-striped">
    <thead>
      <tr>
        <td colspan="3"></td>
        <th scope="col">2018</th>
        <th scope="col">2019</th>
        <th scope="col">2020</th>
        <th scope="col">2021</th>
      </tr>
    </thead>
    
    <tbody>
      <tr>
        <th rowspan="12">Total</th>
        <td rowspan="4">Total</td>
        <td>a</td>
        <td>880</td>
        <td>818</td>
        <td>718</td>
        <td>660</td>
      </tr>
      <tr>
        <td>b</td>
        <td>880</td>
        <td>818</td>
        <td>718</td>
        <td>660</td>
      </tr>
      <tr>
        <td>c</td>
        <td>880</td>
        <td>818</td>
        <td>718</td>
        <td>660</td>
      </tr>
      <tr>
        <td>d</td>
        <td>880</td>
        <td>818</td>
        <td>718</td>
        <td>660</td>
      </tr>
      <tr>
        <td rowspan="4">Kvinne</td>
        <td>a</td>
        <td>440</td>
        <td>409</td>
        <td>359</td>
        <td>330</td>
      </tr>
      <tr>
        <td>b</td>
        <td>440</td>
        <td>409</td>
        <td>359</td>
        <td>330</td>
      </tr>
      <tr>
        <td>c</td>
        <td>440</td>
        <td>409</td>
        <td>359</td>
        <td>330</td>
      </tr>
      <tr>
        <td>d</td>
        <td>440</td>
        <td>409</td>
        <td>359</td>
        <td>330</td>
      </tr>
      <tr>
        <td rowspan="4">Mann</td>
        <td>a</td>
        <td>440</td>
        <td>409</td>
        <td>359</td>
        <td>330</td>
      </tr>
      <tr>
        <td>b</td>
        <td>440</td>
        <td>409</td>
        <td>359</td>
        <td>330</td>
      </tr>
      <tr>
        <td>c</td>
        <td>440</td>
        <td>409</td>
        <td>359</td>
        <td>330</td>
      </tr>
      <tr>
        <td>d</td>
        <td>440</td>
        <td>409</td>
        <td>359</td>
        <td>330</td>
      </tr>
      <tr>
        <th rowspan="12">Dødsfall av sykdommer</th>
        <td rowspan="4">Total</td>
        <td>a</td>
        <td>440</td>
        <td>409</td>
        <td>359</td>
        <td>330</td>
      </tr>
      <tr>
        <td>b</td>
        <td>440</td>
        <td>409</td>
        <td>359</td>
        <td>330</td>
      </tr>
      <tr>
        <td>c</td>
        <td>440</td>
        <td>409</td>
        <td>359</td>
        <td>330</td>
      </tr>
      <tr>
        <td>d</td>
        <td>440</td>
        <td>409</td>
        <td>359</td>
        <td>330</td>
      </tr>
      <tr>
        <td rowspan="4">Kvinne</td>
        <td>a</td>
        <td>220</td>
        <td>105</td>
        <td>179</td>
        <td>165</td>
      </tr>
      <tr>
        <td>b</td>
        <td>220</td>
        <td>105</td>
        <td>179</td>
        <td>165</td>
      </tr>
      <tr>
        <td>c</td>
        <td>220</td>
        <td>105</td>
        <td>179</td>
        <td>165</td>
      </tr>
      <tr>
        <td>d</td>
        <td>220</td>
        <td>105</td>
        <td>179</td>
        <td>165</td>
      </tr>
      <tr>
        <td rowspan="4">Mann</td>
        <td>a</td>
        <td>220</td>
        <td>105</td>
        <td>179</td>
        <td>165</td>
      </tr>
      <tr>
        <td>b</td>
        <td>220</td>
        <td>105</td>
        <td>179</td>
        <td>165</td>
      </tr>
      <tr>
        <td>c</td>
        <td>220</td>
        <td>105</td>
        <td>179</td>
        <td>165</td>
      </tr>
      <tr>
        <td>d</td>
        <td>220</td>
        <td>105</td>
        <td>179</td>
        <td>165</td>
      </tr>
      <tr>
        <th rowspan="12">Ytre årsaker</th>
        <td rowspan="4">Total</td>
        <td>a</td>
        <td>440</td>
        <td>409</td>
        <td>359</td>
        <td>330</td>
      </tr>
      <tr>
        <td>b</td>
        <td>440</td>
        <td>409</td>
        <td>359</td>
        <td>330</td>
      </tr>
      <tr>
        <td>c</td>
        <td>440</td>
        <td>409</td>
        <td>359</td>
        <td>330</td>
      </tr>
      <tr>
        <td>d</td>
        <td>440</td>
        <td>409</td>
        <td>359</td>
        <td>330</td>
      </tr>
      <tr>
        <td rowspan="4">Kvinne</td>
        <td>a</td>
        <td>220</td>
        <td>105</td>
        <td>179</td>
        <td>165</td>
      </tr>
      <tr>
        <td>b</td>
        <td>220</td>
        <td>105</td>
        <td>179</td>
        <td>165</td>
      </tr>
      <tr>
        <td>c</td>
        <td>220</td>
        <td>105</td>
        <td>179</td>
        <td>165</td>
      </tr>
      <tr>
        <td>d</td>
        <td>220</td>
        <td>105</td>
        <td>179</td>
        <td>165</td>
      </tr>
      <tr>
        <td rowspan="4">Mann</td>
        <td>a</td>
        <td>220</td>
        <td>105</td>
        <td>179</td>
        <td>165</td>
      </tr>
      <tr>
        <td>b</td>
        <td>220</td>
        <td>105</td>
        <td>179</td>
        <td>165</td>
      </tr>
      <tr>
        <td>c</td>
        <td>220</td>
        <td>105</td>
        <td>179</td>
        <td>165</td>
      </tr>
      <tr>
        <td>d</td>
        <td>220</td>
        <td>105</td>
        <td>179</td>
        <td>165</td>
      </tr>
    </tbody>

    <!-- <tbody>
      <tr>
        <th rowspan="9">Total</th>
        <td rowspan="3">Total</td>
        <td>a</td>
        <td>880</td>
        <td>818</td>
        <td>718</td>
        <td>660</td>
      </tr>
      <tr>
        <td>b</td>
        <td>880</td>
        <td>818</td>
        <td>718</td>
        <td>660</td>
      </tr>
      <tr>
        <td>c</td>
        <td>880</td>
        <td>818</td>
        <td>718</td>
        <td>660</td>
      </tr>
      <tr>
        <td rowspan="3">Kvinne</td>
        <td>a</td>
        <td>440</td>
        <td>409</td>
        <td>359</td>
        <td>330</td>
      </tr>
      <tr>
        <td>b</td>
        <td>440</td>
        <td>409</td>
        <td>359</td>
        <td>330</td>
      </tr>
      <tr>
        <td>c</td>
        <td>440</td>
        <td>409</td>
        <td>359</td>
        <td>330</td>
      </tr>
      <tr>
        <td rowspan="3">Mann</td>
        <td>a</td>
        <td>440</td>
        <td>409</td>
        <td>359</td>
        <td>330</td>
      </tr>
      <tr>
        <td>b</td>
        <td>440</td>
        <td>409</td>
        <td>359</td>
        <td>330</td>
      </tr>
      <tr>
        <td>c</td>
        <td>440</td>
        <td>409</td>
        <td>359</td>
        <td>330</td>
      </tr>
      <tr>
        <th rowspan="9">Dødsfall av sykdommer</th>
        <td rowspan="3">Total</td>
        <td>a</td>
        <td>440</td>
        <td>409</td>
        <td>359</td>
        <td>330</td>
      </tr>
      <tr>
        <td>b</td>
        <td>440</td>
        <td>409</td>
        <td>359</td>
        <td>330</td>
      </tr>
      <tr>
        <td>c</td>
        <td>440</td>
        <td>409</td>
        <td>359</td>
        <td>330</td>
      </tr>
      <tr>
        <td rowspan="3">Kvinne</td>
        <td>a</td>
        <td>220</td>
        <td>105</td>
        <td>179</td>
        <td>165</td>
      </tr>
      <tr>
        <td>b</td>
        <td>220</td>
        <td>105</td>
        <td>179</td>
        <td>165</td>
      </tr>
      <tr>
        <td>c</td>
        <td>220</td>
        <td>105</td>
        <td>179</td>
        <td>165</td>
      </tr>
      <tr>
        <td rowspan="3">Mann</td>
        <td>a</td>
        <td>220</td>
        <td>105</td>
        <td>179</td>
        <td>165</td>
      </tr>
      <tr>
        <td>b</td>
        <td>220</td>
        <td>105</td>
        <td>179</td>
        <td>165</td>
      </tr>
      <tr>
        <td>c</td>
        <td>220</td>
        <td>105</td>
        <td>179</td>
        <td>165</td>
      </tr>
      <tr>
        <th rowspan="9">Ytre årsaker</th>
        <td rowspan="3">Total</td>
        <td>a</td>
        <td>440</td>
        <td>409</td>
        <td>359</td>
        <td>330</td>
      </tr>
      <tr>
        <td>b</td>
        <td>440</td>
        <td>409</td>
        <td>359</td>
        <td>330</td>
      </tr>
      <tr>
        <td>c</td>
        <td>440</td>
        <td>409</td>
        <td>359</td>
        <td>330</td>
      </tr>
      <tr>
        <td rowspan="3">Kvinne</td>
        <td>a</td>
        <td>220</td>
        <td>105</td>
        <td>179</td>
        <td>165</td>
      </tr>
      <tr>
        <td>b</td>
        <td>220</td>
        <td>105</td>
        <td>179</td>
        <td>165</td>
      </tr>
      <tr>
        <td>c</td>
        <td>220</td>
        <td>105</td>
        <td>179</td>
        <td>165</td>
      </tr>
      <tr>
        <td rowspan="3">Mann</td>
        <td>a</td>
        <td>220</td>
        <td>105</td>
        <td>179</td>
        <td>165</td>
      </tr>
      <tr>
        <td>b</td>
        <td>220</td>
        <td>105</td>
        <td>179</td>
        <td>165</td>
      </tr>
      <tr>
        <td>c</td>
        <td>220</td>
        <td>105</td>
        <td>179</td>
        <td>165</td>
      </tr>
    </tbody> -->
  </table>
</div>`;
}

/*
 * Return empty string to use a copy of exampleHtml as codeHtml.
 * Return null to remove Code from library-item.
 */
function getCodeHtml(): string | null {
  return null;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
  return `
<p>Tabell benyttes når du har behov for å presentere tabulære data.</p>

<p>I FHI Designsystem er grunn-tabellene bygget som <a href="${CONST.BootstrapBaseUrl}/content/tables/">Bootstrap-tabell</a>.</p>`;
}
