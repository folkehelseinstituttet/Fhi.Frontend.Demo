import { LibraryItemConstants as CONST } from '../library-item-constants';

export const ModalsIntro = `
<p>
  FHI Modal er bygget på
  <a href="https://ng-bootstrap.github.io/#/components/modal/examples">ng-bootstrap modal</a>
  og skal kunne brukes de fleste steder der en trenger en modal.
  For å ta den i bruk i en Angular-applikasjon må NPM-pakken
  <a href="${CONST.FhiAngularComponentsNpmUrl}">@folkehelseinstituttet/angular-components</a>
  være lagt til som en "dependency".
</p>

<h2 class="h5">Nyttige lenker</h2>

<ul>
  <li>
    <a href="${CONST.FhiAngularComponentsGithubLibUrl}/fhi-modal/README.md#API">
      API-dokumentasjon
    </a>
  </li>
  <li>
    <a href="${CONST.FhiAngularComponentsGithubLibUrl}/fhi-modal">
      Kildekode
    </a>
  </li>
  <li>
    <a href="${CONST.ExampleComponentsGithubUrl}/modals">
      Demokode
    </a>
  </li>
</ul>`;
