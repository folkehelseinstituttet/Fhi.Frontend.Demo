import { LibraryItemIds } from 'src/app/library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { BootstrapComponentsBaseUrl, NgBootstrapComponentsBaseUrl } from '../../bootstrap-base-urls';

export const Breadcrumb: LibraryItem[] = [{
    id: LibraryItemIds.Breadcrumb,
    title: 'Breadcrumb',
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
<nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="#">Hjem</a></li>
    <li class="breadcrumb-item"><a href="#">Seksjonsside</a></li>
    <li class="breadcrumb-item active" aria-current="page">Siden du er på</li>
  </ol>
</nav>`;
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
<p>Breadcrumb (brødsmulesti) er en viktig veiviser - et navigasjonselement som gjenspeiler informasjonshierarkiet på nettstedet. Brødsmulestien er en liste med lenker som viser siden du står på nå og dens «forfedre» (foreldreside, besteforeldreside og så videre), og stien går vanligvis helt tilbake til nettstedets hjemmeside. På mobil må du unngå å bruke brødsmulestier som er for små eller brytes på flere linjer.</p>

<ul>
    <li>Vurder hvor mye plass du har til rådighet før du bestemmer deg for å bruke Breadcrumb</li>
    <li>På små skjermer, på nettsteder og i strukturer der du risikerer lange sidetitler og mer enn 3 nivåer må det vurderes å avkorte (truncate) overskrifter</li>
</ul>

<p>
    Bootstrap-dokumentasjon for
    <a href="${BootstrapComponentsBaseUrl}/breadcrumb">Breadcrumb</a>
</p>`;
}
