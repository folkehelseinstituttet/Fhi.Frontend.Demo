import { LibraryItemIds } from '../library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemConstants as CONST } from '../library-item-constants';

export const Alert: LibraryItem[] = [{
  id: LibraryItemIds.Alert,
  title: 'Alert',
  type: LibraryItemType.html,
  exampleHtml: getExampleHtml(),
  codeHtml: getCodeHtml(),
  documentationHtml: getDocumentationHtml()
}];


/*
 * Return value is ignored if LibraryItemType is not html
 */
function getExampleHtml(): string {
  return `
<div class="alert alert-info">
  <i class="icon-info-circle"></i>
  Dette er en melding til informasjon.
</div>
<div class="alert alert-success">
  <i class="icon-check-circle-regular"></i>
  Dette er en melding om suksess!
</div>
<div class="alert alert-warning">
  <i class="icon-bell-regular"></i>
  Dette er en advarsel!
</div>
<div class="alert alert-error">
  <i class="icon-bell-regular"></i>
  Dette er en feilmelding.
</div>
<div class="alert alert-info fhi-alert-bordered">
  <i class="icon-info-circle"></i>
  Dette er en melding til informasjon.
</div>
<div class="alert alert-success fhi-alert-bordered">
  <i class="icon-check-circle-regular"></i>
  Dette er en melding om suksess!
</div>
<div class="alert alert-warning fhi-alert-bordered">
  <i class="icon-bell-regular"></i>
  Dette er en advarsel!
</div>
<div class="alert alert-error fhi-alert-bordered">
  <i class="icon-bell-regular"></i>
  Dette er en feilmelding.
</div>`;
}

/*
 * Return empty string to use a copy of exampleHtml as codeHtml.
 * Return null to remove Code from library-item.
 */
function getCodeHtml(): string | null {
  return `
<div class="alert">
  <i class="icon-info-circle"></i>
  Alert!
</div>`;
}

/*
 * Return null to remove Code from library-item.
 */
function getDocumentationHtml(): string | null {
  return `
<p>
  Bootstrap-dokumentasjon for
  <a href="${CONST.BootstrapComponentsBaseUrl}/alerts">Alerts</a>
</p>
<p>
  Alerts er tilgjengelige som:
</p>
<ul>
  <li>
    <code>alert-info</code> (standard, gir samme utseende som baseklassen <code>alert</code>)
  </li>
  <li>
    <code>alert-success</code>
  </li>
  <li>
    <code>alert-warning</code>
  </li>
  <li>
    <code>alert-error</code>
  </li>
</ul>
<p class="pt-3">
  For innrammede alerts med hvit bakgrunn, legg til <code>fhi-alert-bordered</code> i tillegg til tilstands-klasse.
</p>`;
}
