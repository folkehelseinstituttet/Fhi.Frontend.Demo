import { LibraryItem } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemsSharedData as ITEMS } from '../library-items-shared-data';
import { LibraryItemGroupsSharedData as GROUPS } from '../library-item-groups-shared-data';
import { LibraryItemConstants as CONST } from '../library-item-constants';
import { ItemDependencyType, ItemType } from 'src/app/views/shared/item-type.enums';

export const AlertBasic: LibraryItem[] = [
  {
    id: ITEMS.AlertBasic.id,
    title: ITEMS.AlertBasic.title,
    type: ItemType.html,
    exampleHtml: getExampleHtml(),
    codeHtml: getCodeHtml(),
    documentationHtml: getDocumentationHtml(),
    parent: GROUPS.Alerts,
    dependencyType: ItemDependencyType.css,
  },
];

/*
 * Return value is ignored if LibraryItemType is not html
 */
function getExampleHtml(): string {
  return `
<div class="alert alert-info" role="alert">
  <i class="icon-info-circle"></i>
  Dette er en melding til informasjon.
</div>
<div class="alert alert-success" role="alert">
  <i class="icon-check-circle"></i>
  Dette er en melding om suksess!
</div>
<div class="alert alert-warning" role="alert">
  <i class="icon-bell"></i>
  Dette er en advarsel!
</div>
<div class="alert alert-error" role="alert">
  <i class="icon-exclamation-circle"></i>
  Dette er en feilmelding.
</div>
<div class="alert alert-info fhi-alert-bordered" role="alert">
  <i class="icon-info-circle"></i>
  Dette er en melding til informasjon.
</div>
<div class="alert alert-success fhi-alert-bordered" role="alert">
  <i class="icon-check-circle"></i>
  Dette er en melding om suksess!
</div>
<div class="alert alert-warning fhi-alert-bordered" role="alert">
  <i class="icon-bell"></i>
  Dette er en advarsel!
</div>
<div class="alert alert-error fhi-alert-bordered" role="alert">
  <i class="icon-exclamation-circle"></i>
  Dette er en feilmelding.
</div>`;
}

/*
 * Return empty string to use a copy of exampleHtml as codeHtml.
 * Return null to remove Code from library-item.
 */
function getCodeHtml(): string | null {
  return `
<div class="alert alert-info" role="alert">
  <i class="icon-[name]"></i>
  Alert!
</div>

<div class="alert alert-info fhi-alert-bordered" role="alert">
  <i class="icon-[name]"></i>
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
