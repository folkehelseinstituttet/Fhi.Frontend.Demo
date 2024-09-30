import { LibraryItem } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemsSharedData as ITEMS } from '../library-items-shared-data';
import { LibraryItemGroupsSharedData as GROUPS } from '../library-item-groups-shared-data';
import { ItemDependencyType, ItemType } from 'src/app/views/shared/item-type.enums';

export const NavTiles: LibraryItem[] = [
  {
    id: ITEMS.NavTiles.id,
    title: ITEMS.NavTiles.title,
    type: ItemType.html,
    exampleHtml: getExampleHtml(),
    codeHtml: getCodeHtml(),
    documentationHtml: getDocumentationHtml(),
    parent: GROUPS.Navs,
    dependencyType: ItemDependencyType.css,
  },
];

/*
 * Return value is ignored if LibraryItemType is not html
 */
function getExampleHtml(): string {
  return `
<div class="row gx-3 gx-sm-5">
  <div class="col-auto col-md-6 mb-3 mb-md-5">
    <article class="fhi-navigation-tile">
      <header class="fhi-navigation-tile__header">
        <p class="fhi-navigation-tile__heading">
          <a href="javascript:void(0)" class="fhi-navigation-tile__link">Overskrift som ikke bør være for lang</a>
        </p>
        
        <span class="fhi-navigation-tile__icon">
          <i class="icon-hospital"></i>
        </span>
      </header>

      <p class="fhi-navigation-tile__description">Kort, men beskrivende tekst. Man bør etterstrebe at denne teksten ikke blir mer enn 5 linjer.</p>

      <p class="fhi-navigation-tile__footer">Kilde: Kildens navn (AKRONYM)</p>
    </article>
  </div>
</div>`;
}

/*
 * Return empty string to use a copy of exampleHtml as codeHtml.
 * Return null to remove Code from library-item.
 */
function getCodeHtml(): string | null {
  return `
<article class="fhi-navigation-tile">
  <header class="fhi-navigation-tile__header">
    <p class="fhi-navigation-tile__heading">
      <a href="#" class="fhi-navigation-tile__link">Overskrift som ikke bør være for lang</a>
    </p>

    <span class="fhi-navigation-tile__icon">
      <i class="icon-hospital"></i>
    </span>
  </header>

  <p class="fhi-navigation-tile__description">Kort, men beskrivende tekst. Den skal ikke være for lang, og man bør etterstrebe at den ikke blir mer enn 5 linjer.</p>

  <p class="fhi-navigation-tile__footer">Kilde: Kildens navn (AKRONYM)</p>
</article>`;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
  return `
<p>Overskrift er påkrevd for å benytte denne komponenten, beskrivelse og ikon er valgfrie (teknisk sett).</p>
<p>Dersom man ikke trenger/ønsker beskrivelse og ikon er nok ikke dette riktig komponent å benytte.</p>`;
}
