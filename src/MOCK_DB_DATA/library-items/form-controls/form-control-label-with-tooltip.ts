import { LibraryItem } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemsSharedData as ITEMS } from '../library-items-shared-data';
import { LibraryItemGroupsSharedData as GROUPS } from '../library-item-groups-shared-data';
import { LibraryItemConstants as CONST } from '../library-item-constants';
import { ItemDependencyType, ItemType } from 'src/app/views/shared/item-type.enums';

export const FormControlInputWithTooltip: LibraryItem[] = [
  {
    id: ITEMS.FormControlInputWithTooltip.id,
    title: ITEMS.FormControlInputWithTooltip.title,
    type: ItemType.angular,
    exampleHtml: getExampleHtml(),
    codeHtml: getCodeHtml(),
    documentationHtml: getDocumentationHtml(),
    parent: GROUPS.FormControls,
    dependencyType: ItemDependencyType.ngBootstrap,
  },
];

/*
 * Return value is ignored if LibraryItemType is not html
 */
function getExampleHtml(): string {
  return `
<label for="FormInput" class="form-label" aria-describedby="hjelpeTekst">
  Hjelpetekst
  <i class="icon-question-circle icon-sm ms-1" ngbTooltip="Tooltip-tekst"></i>
</label>
<p class="form-text" id="hjelpeTekst">Hjelpetekst, f.eks "Valgfritt felt"</p>
<input type="text" id="FormInput" class="form-control" placeholder="Standard tekstfelt" />`;
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
<h5>Nyttige lenker</h5>
<ul>
    <li>
        <a href="${CONST.NgBootstrapComponentsBaseUrl}/tooltip/api">API-dokumentasjon for Tooltip-komponent</a>
    </li>
    <li>
        <a href="${CONST.NgBootstrapComponentsBaseUrl}/tooltip/examples">Eksempler for Tooltip-komponent</a>
    </li>
</ul>`;
}
