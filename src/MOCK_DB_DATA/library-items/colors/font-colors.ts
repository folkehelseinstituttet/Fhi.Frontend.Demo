import { LibraryItem } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemsSharedData as ITEMS } from '../library-items-shared-data';
import { LibraryItemGroupsSharedData as GROUPS } from '../library-item-groups-shared-data';
import { LibraryItemConstants as CONST } from '../library-item-constants';
import { ItemDependencyType, ItemType } from 'src/app/views/shared/item-type.enums';

export const FontColors: LibraryItem[] = [
  {
    id: ITEMS.VisualIdentityFontColors.id,
    title: ITEMS.VisualIdentityFontColors.title,
    titleLang: CONST.languageLocaleId_NO,
    type: ItemType.html,
    exampleHtml: getExampleHtml(),
    codeHtml: getCodeHtml(),
    documentationHtml: getDocumentationHtml(),
    parent: GROUPS.Colors,
    dependencyType: ItemDependencyType.css,
  },
];

/*
 * Return value is ignored if LibraryItemType is not html
 */
function getExampleHtml(): string {
  return `
<!--
  NB! Denne koden er ikke regnet som beste praksis, men er et forsøk
  på å vise noen ulike strategier på bruk av Bootstrap-rammeverket.
  Når FHI retningslinjer er definert vil denne koden bli endret.
-->
<div class="row">
  <div class="col-sm p-3 pt-5">
    <p><strong>Normal brødtekst</strong></p>
    <p class="fhi-text-ancillary"><strong>Hjelpetekst</strong></p>
    <p><a href="#">Lenketekst</a></p>
    <p class="text-muted"><strong>Deaktivert element</strong></p>
    <p class="text-error"><strong>Feilmelding</strong></p>
  </div>
  <div class="col-sm p-3 pt-5 bg-dark">
    <p class="text-white"><strong>Normal brødtekst</strong></p>
    <p class="fhi-text-ancillary-inverse"><strong>Hjelpetekst</strong></p>
    <p><a href="#" class="text-white">Lenketekst</a></p>
    <p class="fhi-text-disabled-inverse"><strong>Deaktivert element</strong></p>
    <p class="fhi-text-error-inverse"><strong>Feilmelding</strong></p>
  </div>
  <div class="col-sm p-3 pt-5 bg-primary">
    <p class="text-white"><strong>Normal brødtekst</strong></p>
  </div>
</div>`;
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
  return null;
}
