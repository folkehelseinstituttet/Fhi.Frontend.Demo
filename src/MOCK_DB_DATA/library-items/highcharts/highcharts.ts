import { LibraryItemIds } from '../library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemConstants as CONST } from '../library-item-constants';

export const Highcharts: LibraryItem[] = [{
  id: LibraryItemIds.Highcharts,
  title: 'FHI Angular Highcharts',
  type: LibraryItemType.fhiAngular,
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
  return `<fhi-angular-highcharts [diagramOptions]="diagramOptions"></fhi-angular-highcharts>`;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
  return `
<h3>Kom i gang</h3>
<p>
  <a href="https://www.npmjs.com/package/@folkehelseinstituttet/angular-highcharts">
    @folkehelseinstituttet/angular-highcharts
  </a>
</p>
<h4>Lenke til kildekode</h4>
<p>
  <a href="https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/tree/dev/projects/fhi-angular-highcharts">
    projects/fhi-angular-highcharts
  </a>
</p>
<h4>Lenke til demokoden</h4>
<p>
  <a href="https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/blob/dev/src/app/views/shared/dynamic-library-examples/fhi-angular-examples/fhi-angular-highcharts-example/fhi-angular-highcharts-example.component.ts">
    fhi-angular-highcharts-example/fhi-angular-highcharts-example.component.ts
  </a>
</p>

<h3>API</h3>

<h4>Inputs</h3>
<div class="table-responsive mb-5">
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
        <th>diagramOptions</th>
        <td><code>FhiDiagramOptions</code></td>
        <td>-</td>
        <td>yes</td>
        <td>Alle properties som trengs for å rendre en tabell, graf eller et kart.</td>
      </tr>
   </tbody>
  </table>
</div>

<h4>FhiDiagramOptions, detaljer</h4>
<div class="table-responsive mb-5">
  <table class="table table-striped">
    <thead>
      <tr>
        <th scope="col">Property</th>
        <th scope="col">Type</th>
        <th scope="col">Default</th>
        <th scope="col">Required</th>
        <th scope="col">Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>creditsHref</th>
        <td><code>string</code></td>
        <td>-</td>
        <td>no</td>
        <td>Lenke til kildehenvisning i footer.</td>
      </tr>
      <tr>
        <th>creditsText</th>
        <td><code>string</code></td>
        <td>-</td>
        <td>no</td>
        <td>Kildehenvisning i footer.</td>
      </tr>
      <tr>
        <th>diagramTypeId</th>
        <td><code>string</code></td>
        <td>table</td>
        <td>no</td>
        <td>
          Default diagramtype når modul laster.
          Lovlige diagramTypeId'er:
          <ul>
            <li><code>table</code></li>
            <li><code>line</code></li>
            <li><code>column</code></li>
            <li><code>bar</code></li>
            <li><code>columnStacked</code></li>
            <li><code>barStacked</code></li>
            <li><code>pie</code></li>
          </ul>
        </td>
      </tr>
      <tr>
        <th>diagramTypeNavId</th>
        <td><code>string</code></td>
        <td>-</td>
        <td>no</td>
        <td>
          Id'en til den menyen en ønsker. HVis utelatt så rendres ingen meny.
          Lovlige diagramTypeNavId'er:
          <ul>
            <li><code>default</code></li>
          </ul>
        </td>
      </tr>
   </tbody>
  </table>
</div>

<h4>Outputs</h3>
<div class="table-responsive">
  <table class="table table-striped">
    <thead>
      <tr>
        <th scope="col">Output</th>
        <th scope="col">Event type</th>
        <th scope="col">Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>diagramTypeNavigation</th>
        <td><code>string</code></td>
        <td>
          Hvis diagramtypemeny vises vil dette eventet fyre hver gang en navigasjon utføres.
          Eventverdien er en av de lovlige <code>diagramTypeId</code>'ene.
        </td>
      </tr>
   </tbody>
  </table>
</div>`;

}
