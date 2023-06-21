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
<p class="mb-5">
  <a href="https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/blob/dev/src/app/views/shared/dynamic-library-examples/fhi-angular-examples/fhi-angular-highcharts-example/fhi-angular-highcharts-example.component.ts">
    fhi-angular-highcharts-example/fhi-angular-highcharts-example.component.ts
  </a>
</p>

<h3 class="mb-5">API</h3>

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

<h4>Outputs</h3>
<div class="table-responsive mb-5">
  <table class="table table-striped">
    <thead>
      <tr>
        <th scope="col">Output</th>
        <th scope="col">Event&nbsp;type</th>
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
          Id'en til den menyen en ønsker. Hvis utelatt så rendres ingen meny.
          Lovlige diagramTypeNavId'er:
          <ul>
            <li><code>default</code></li>
          </ul>
        </td>
      </tr>
      <tr>
        <th>disclaimer</th>
        <td><code>string</code></td>
        <td>-</td>
        <td>no</td>
        <td>Fritekst nederst i footer, gjerne bruk til forbehold knyttet til dataene som vises.</td>
      </tr>
      <tr>
        <th>flags</th>
        <td><code>Array&lt;FhiDiagramFlag&gt;</code></td>
        <td>-</td>
        <td>no</td>
        <td>Alle flagg som kan finnes i datasettet (f.eks. flagg som indikerer anonymisering)</td>
      </tr>
      <tr>
        <th>lastUpdated</th>
        <td><code>string</code></td>
        <td>-</td>
        <td>no</td>
        <td>Tekst som kommer etter label "Sist oppdatert" i footer. Valgfritt format, men "dd.mm.yyyy" er vanligst.</td>
      </tr>
      <tr>
        <th>openSource</th>
        <td><code>boolean</code></td>
        <td>true</td>
        <td>no</td>
        <td>Hvis satt til <code>true</code>: lenken til Highcharts.com forsvinner, og <strong>lisens er påkrevd</strong>.</td>
      </tr>
      <tr>
        <th>series</th>
        <td><code>Array&lt;FhiDiagramSerie&gt;</code></td>
        <td>-</td>
        <td>yes</td>
        <td>Dataene som brukes for å generere tabell, graf eller kart.</td>
      </tr>
      <tr>
        <th>title</th>
        <td><code>string</code></td>
        <td>-</td>
        <td>yes</td>
        <td>Tittelen som kommer over diagrammet.</td>
      </tr>
    </tbody>
  </table>
</div>

<h4>FhiDiagramSerie, detaljer</h4>
<div class="table-responsive">
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
        <th>data</th>
        <td><code>Array&lt;Data&gt;</code></td>
        <td>-</td>
        <td>yes</td>
        <td>Alle datapunkt i en serie.</td>
      </tr>
      <tr>
        <th>name</th>
        <td><code>string&nbsp;|&nbsp;Array&lt;string&gt;</code></td>
        <td>-</td>
        <td>yes</td>
        <td>
          <b>Obs!</b> Type <code>string</code> er en formatert string. Pipe brukes som skilletegn
          mellom kategorinavn hvis det er mer enn ett kategorinavn som er slått sammen til ett serienavn. Hvis en
          vil slippe å forholde seg til et spesifikt skilletegn kan en nå velge å bruke en array bestående av kategorinavn i stedet.
        </td>
      </tr>
      <tr>
        <th>stack</th>
        <td><code>string</code></td>
        <td>-</td>
        <td>no</td>
        <td>Brukes hvis en ønsker å gruppere serier i diagramtypene <code>barStacked</code> eller <code>columnStacked</code>.</td>
      </tr>
    </tbody>
  </table>
</div>`;

}
