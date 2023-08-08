import { LibraryItemIds } from '../library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemConstants as CONST } from '../library-item-constants';

export const CardShadow: LibraryItem[] = [{
  id: LibraryItemIds.CardShadow,
  title: 'Card w/shadow',
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
<div class="row">
  <div class="col-sm-8 col-md-6">
    <div class="card fhi-card-shadow">
      <div class="card-body">
        <h2 class="card-title">Overskrift</h2>
        <p class="card-text">Innhold</p>
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
<div class="card fhi-card-shadow">
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
  return null;
}
