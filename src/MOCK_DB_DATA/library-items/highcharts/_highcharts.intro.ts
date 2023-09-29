import { LibraryItemConstants as CONST } from '../library-item-constants';

export const HighchartsIntro = `
<p class="lead">
  Folkehelseintitutte har valgt å bruker Highcharts for å vise diagrammer med FHI-design.
</p>
<p>
  For å gjøre det så enkelt som mulig å ta i bruk Highcharts, er det utviklet en komponent
  som tilgjengeliggjør et bearbeidet utvalg av det <a href="https://www.highcharts.com">Highcharts</a>
  har å tilby.
  Den er bygget på <a href="https://github.com/highcharts/highcharts-angular">Highcharts Angular</a>,
  og for å ta den i bruk i en Angular-applikasjon må NPM-pakken
  <a href="${CONST.FhiAngularHighchartsNpmUrl}">@folkehelseinstituttet/angular-highcharts</a>
  være langt til som en "dependency".
<p>
</p>
  Det å vise diagrammer i en web-applikasjon er i utgangspunktet utfordrene å få til på en god måte.
  Ekstra utfordrene blir det siden vi må støtte dynamiske data, i tillegg til riktig design og universell
  utforming. Vi jobber med å fikse feil og mangler vi vet om, og håper alle som tar i bruk
  "FHI Angular Highcharts" vil hjelpe oss med å gjøre denne komponenten bedre.
</p>

<h2 class="h3">Nyttige lenker</h2>

<ul>
  <li>
    <a href="${CONST.FhiAngularHighchartsGithubUrl}/README.md#API">
      API-dokumentasjon
    </a>
  </li>
  <li>
    <a href="${CONST.FhiAngularHighchartsGithubUrl}">
      Kildekode
    </a>
  </li>
  <li>
    <a href="${CONST.ExampleComponentsGithubUrl}/highcharts">
      Demokode
    </a>
  </li>
</ul>`;
