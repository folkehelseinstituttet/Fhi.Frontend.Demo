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
      <article class="fhi-card fhi-card--deactive">
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
<article class="fhi-card fhi-card--deactive">
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
  return null;
}