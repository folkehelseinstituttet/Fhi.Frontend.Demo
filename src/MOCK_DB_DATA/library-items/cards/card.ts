import { LibraryItemIds } from '../library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemConstants as CONST } from '../library-item-constants';

export const Card: LibraryItem[] = [{
  id: LibraryItemIds.Card,
  title: 'Card',
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
<div class="bg-light p-5 mx-n3 my-n5 mx-sm-n5">
  <div class="row">
    <div class="col-sm-8 col-md-6">
      <div class="card">
        <div class="card-body">
          <h2 class="card-title">Overskrift</h2>
          <p class="card-text">Innhold</p>
        </div>
      </div>
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
<div class="card">
  <div class="card-body">
    <h2 class="card-title">Overskrift</h2>
    <p class="card-text">Innhold</p>
  </div>
</div>`;
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
