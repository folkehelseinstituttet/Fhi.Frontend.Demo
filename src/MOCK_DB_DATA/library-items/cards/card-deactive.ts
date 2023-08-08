import { LibraryItemIds } from '../library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemConstants as CONST } from '../library-item-constants';

export const CardDeactive: LibraryItem[] = [{
  id: LibraryItemIds.CardDeactive,
  title: 'Card - deactive',
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
      <div class="card fhi-card-deactive">
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
<div class="card fhi-card-deactive">
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
