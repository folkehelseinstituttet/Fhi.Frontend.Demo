import { LibraryItem } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemsSharedData as ITEMS } from '../library-items-shared-data';
import { LibraryItemGroupsSharedData as GROUPS } from '../library-item-groups-shared-data';
import { LibraryItemConstants as CONST } from '../library-item-constants';
import { ItemDependencyType, ItemType } from 'src/app/views/shared/item-type.enums';

export const BadgeRounded: LibraryItem[] = [
  {
    id: ITEMS.BadgeRounded.id,
    title: ITEMS.BadgeRounded.title,
    type: ItemType.html,
    exampleHtml: getExampleHtml(),
    codeHtml: getCodeHtml(),
    documentationHtml: getDocumentationHtml(),
    parent: GROUPS.Badges,
    dependencyType: ItemDependencyType.css,
  },
];

/*
 * Return value is ignored if LibraryItemType is not html
 */
function getExampleHtml(): string {
  return `
<span class="badge rounded-pill fhi-badge fhi-badge--rounded">
  100
  <span class="visually-hidden">text explaining what's counted</span>
</span>
<hr>
<h2 class="h5 mt-6 mb-4">Bruksscenario</h2>
<ul>
  <li>
    Forskningssammendrag
    <span class="ms-4 badge rounded-pill fhi-badge fhi-badge--rounded">
      100
      <span class="visually-hidden">sammendrag tilgjengelig</span>
    </span>
  </li>
  <li>
    Andre
    <span class="ms-4 badge rounded-pill fhi-badge fhi-badge--rounded">
      23
      <span class="visually-hidden">sammendrag tilgjengelig</span>
    </span>
  </li>
</ul>`;
}

/*
 * Return empty string to use a copy of exampleHtml as codeHtml.
 * Return null to remove Code from library-item.
 */
function getCodeHtml(): string | null {
  return `
<span class="badge rounded-pill fhi-badge fhi-badge--rounded">
  100
  <span class="visually-hidden">tekst som beskriver hva som telles</span>
</span>`;
}

/*
 * Return null to remove Code from library-item.
 */
function getDocumentationHtml(): string | null {
  return `
<p>
Kun til bruk for numeriske verdier. En badge gir ikke mening uten en kontekst og skal derfor aldri brukes alene.
</p>
<p>
  Typisk bruksscenario: antall enheter en liste refererer til.
</p>
<p>
  Bootstrap-dokumentasjon for
  <a href="${CONST.BootstrapComponentsBaseUrl}/badge">Badge</a>
</p>`;
}
