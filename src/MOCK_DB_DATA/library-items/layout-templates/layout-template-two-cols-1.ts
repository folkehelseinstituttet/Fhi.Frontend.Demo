import { LibraryItemIds } from '../library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemConstants as CONST } from '../library-item-constants';

export const LayoutTemplateTwoCols1: LibraryItem[] = [{
  id: LibraryItemIds.LayoutTemplateTwoCols1,
  title: 'Layout med venstrekolonne',
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
<div class="container">
  <div class="row">
    <div class="col-12 col-lg-4 border pt-3">
      <p>Venstrekolonne, <br>typisk til bruk for lokalmeny.</p>
    </div>

    <main class="col-12 col-lg-8 border pt-3">
      <p>Hovedinnhold.</p>
      <p class="small">(Rammer for illustrasjon av layout.)</p>
    </main>
  </div>
</div>`;
}

/*
 * Return empty string to use a copy of exampleHtml as codeHtml.
 * Return null to remove Code from library-item.
 */
function getCodeHtml(): string | null {
  return `
<div class="container">
  <div class="row">
    <div class="col-12 col-lg-4">

      <!-- Venstrekolonne -->

    </div>

    <main class="col-12 col-lg-8">

      <!-- Hovedinnhold -->

    </main>
  </div>
</div>`;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
  return `
<p>Enkel layout med venstrekolonne som går over 1/3 av bredden på større skjermer.</p>
<p>På mobil og mindre skjermer legger innoldet i venstrekolonne seg over hovedinnholdet.</p>`;
}
