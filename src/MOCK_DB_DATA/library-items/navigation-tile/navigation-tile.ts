import { LibraryItemIds } from '../library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';

export const NavigationTile: LibraryItem[] = [{
  id: LibraryItemIds.NavigationTile,
  title: 'Navigation tile',
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
<div class="row gx-3 gx-sm-5">
  <div class="col-auto col-md-6 mb-3 mb-md-5">
    <a href="javascript:void(0)" class="fhi-navigation-tile">
      <span class="fhi-navigation-tile__icon">
        <i class="icon-check"></i>
      </span>
      <p class="fhi-navigation-tile__heading">Overskrift</p>
      <p class="fhi-navigation-tile__description">Kort, beskrivende tekst.</p>
    </a>
  </div>

  <div class="col-auto col-md-6 mb-3 mb-md-5">
    <a href="javascript:void(0)" class="fhi-navigation-tile">
      <p class="fhi-navigation-tile__heading">Overskrift</p>
      <p class="fhi-navigation-tile__description">Kort, beskrivende tekst som ikke går over mer enn tre linjer.</p>
    </a>
  </div>
</div>`;
}

/*
 * Return empty string to use a copy of exampleHtml as codeHtml.
 * Return null to remove Code from library-item.
 */
function getCodeHtml(): string | null {
  return `
<a href="#" class="fhi-navigation-tile">
  <!-- Overskrift er påkrevd -->
  <p class="fhi-navigation-tile__heading">Overskrift</p>

  <p class="fhi-navigation-tile__description">Kort, beskrivende tekst.</p>
  <span class="fhi-navigation-tile__icon">
    <i class="icon-[name]"></i>
  </span>
</a>`;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
  return `
<p>Overskrift er påkrevd for å benytte denne komponenten, beskrivelse og ikon er valgfrie (teknisk sett).</p>
<p>Dersom man ikke trenger/ønsker beskrivelse og ikon er nok ikke dette riktig komponent å benytte.</p>`;
}
