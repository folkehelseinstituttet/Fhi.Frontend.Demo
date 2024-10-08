import { LibraryItem } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemsSharedData as ITEMS } from '../library-items-shared-data';
import { LibraryItemGroupsSharedData as GROUPS } from '../library-item-groups-shared-data';
import { ItemDependencyType, ItemType } from 'src/app/views/shared/item-type.enums';

export const Card: LibraryItem[] = [
  {
    id: ITEMS.Card.id,
    title: ITEMS.Card.title,
    type: ItemType.html,
    exampleHtml: getExampleHtml(),
    codeHtml: getCodeHtml(),
    documentationHtml: getDocumentationHtml(),
    parent: GROUPS.Cards,
    dependencyType: ItemDependencyType.css,
  },
];

/*
 * Return value is ignored if LibraryItemType is not html
 */
function getExampleHtml(): string {
  return `
<div class="bg-light p-5 mx-n3 my-n5 mx-sm-n5">
  <div class="row">
    <div class="col-sm-8 col-md-6">
      <article class="fhi-card">
        <h2 class="fhi-card__title">Overskrift</h2>
        <div class="fhi-card__content">
          <p>Innhold</p>
        </div>
      </article>
    </div>
  </div>
</div>`;
}

/*
 * Return empty string to use a copy of exampleHtml as codeHtml.
 * Return null to remove Code from library-item.
 */
function getCodeHtml(): string | null {
  return `
<article class="fhi-card">
  <h2 class="fhi-card__title">Overskrift</h2>
  <div class="fhi-card__content">
    <p>Innhold</p>
  </div>
</article>`;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
  return `
<p><strong>Kort (Card)</strong> er en fleksibel innholdsbeholder som kan romme varierte komponenter og funksjoner. Kortene kan vises i en liste eller grid og er hensiktsmessig å bruke på dashbord- og oversiktssider.</p>
<p>Dersom kortet vises på hvit bakgrunn er det mulig å legge på skygge. (se <strong>Card w/shadow</strong>)</p>
<p>Deaktivert kort er gjennomsiktig og har stiplet ramme (se <strong>Card - deactivated</strong>).</p>`;
}
