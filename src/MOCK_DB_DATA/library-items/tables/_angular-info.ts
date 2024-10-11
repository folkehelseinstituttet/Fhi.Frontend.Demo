import { LibraryItemConstants as CONST } from '../library-item-constants';

export function getAngularInfo(itemTitle: string): string {
  return `
<div class="alert alert-info" role="alert">
  <i class="icon-info-circle"></i>
  <div>
    <p>
      FHI Designsystem inneholder ikke en Angular-komponent for <em>${itemTitle}</em>,
      men all CSS-kode for å realisere dette eksemplet finnes i NPM-pakken 
      <a href="${CONST.FhiStyleNpmUrl}">@folkehelseinstituttet/style</a>
    </p>
    <p class="mb-0">
      Skal en tilsvarende dynamisk løsning lages i en Angular-app kan 
      <a href="${CONST.ExampleComponentsGithubUrl}/tables">demokoden</a>
      brukes som inspirasjon.
    </p>
  </div>
</div>`;
}
