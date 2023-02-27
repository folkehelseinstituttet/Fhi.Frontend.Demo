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
  <div class="col-auto col-sm-12 col-lg-6 mb-3 mb-md-5 mb-lg-0">
    <a href="javascript:void(0)" class="fhi-navigation-tile">
      <span class="fhi-navigation-tile__icon">
        <i class="icon-environment"></i>
      </span>
      <p class="fhi-navigation-tile__heading">Overskrift</p>
      <p class="fhi-navigation-tile__description">Kort, beskrivende tekst som ikke går over mer enn tre linjer.</p>
    </a>
  </div>

  <div class="col-auto col-sm-12 col-lg-6">
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
<a href="" class="fhi-navigation-tile">
  <span class="fhi-navigation-tile__icon">
    <i class="icon-environment"></i>
  </span>
  <p class="fhi-navigation-tile__heading">Overskrift</p>
  <p class="fhi-navigation-tile__description">Kort, beskrivende tekst som ikke går over mer enn tre linjer.</p>
</a>

<a href="" class="fhi-navigation-tile">
  <p class="fhi-navigation-tile__heading">Overskrift</p>
  <p class="fhi-navigation-tile__description">Kort, beskrivende tekst som ikke går over mer enn tre linjer.</p>
</a>`;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
  return null;
}
