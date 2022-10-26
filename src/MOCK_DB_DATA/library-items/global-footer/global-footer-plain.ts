import { LibraryItemIds } from '../library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemConstants as CONST } from '../library-item-constants';

export const GlobalFooterPlain: LibraryItem[] = [{
  id: LibraryItemIds.GlobalFooterPlain,
  title: 'Global footer - plain',
  type: LibraryItemType.html,
  exampleHtml: getExampleHtml(),
  codeHtml: getCodeHtml(),
  documentationHtml: getDocumentationHtml(),
  hasPreviewButton: true
}];


/*
 * Return value is ignored if LibraryItemType is not html
 */
function getExampleHtml(): string {
  return `
<footer class="fhi-footer">
  <div class="container fhi-footer__container">
    <div class="row">
      <div class="col-12">
        <h2 class="h3">Overskrift om ønskelig</h2>
      </div>

      <div class="col-sm-6 col-md-4 col-lg-3">
        <a href="javascript:void(0)" class="btn fhi-btn-shortcut-link">
          <i class="icon-arrow-right"></i>
          <span class="btn__text">Snarvei 1</span>
        </a>
      </div>
      <div class="col-sm-6 col-md-4 col-lg-3">
        <a href="javascript:void(0)" class="btn fhi-btn-shortcut-link">
          <i class="icon-arrow-right"></i>
          <span class="btn__text">Snarvei 2</span>
        </a>
      </div>
      <div class="col-sm-6 col-md-4 col-lg-3">
        <a href="javascript:void(0)" class="btn fhi-btn-shortcut-link">
          <i class="icon-arrow-right"></i>
          <span class="btn__text">Snarvei 3</span>
        </a>
      </div>
      <div class="col-sm-6 col-md-4 col-lg-3">
        <a href="javascript:void(0)" class="btn fhi-btn-shortcut-link">
          <i class="icon-arrow-right"></i>
          <span class="btn__text">Snarvei 4</span>
        </a>
      </div>
    </div>
  </div>
</footer>`;
}

/*
 * Return empty string to use a copy of exampleHtml as codeHtml.
 * Return null to remove Code from library-item.
 */
function getCodeHtml(): string | null {
  return `
<footer class="fhi-footer">
  <div class="container fhi-footer__container">
    <div class="row">
      <div class="col-12">
        <h2 class="h3">Overskrift om ønskelig</h2>
      </div>

      <div class="col-sm-6 col-md-4 col-lg-3">
        <a href="javascript:void(0)" class="btn fhi-btn-shortcut-link">
          <i class="icon-arrow-right"></i>
          <span class="btn__text">Snarvei 1</span>
        </a>
      </div>
      <div class="col-sm-6 col-md-4 col-lg-3">
        <a href="javascript:void(0)" class="btn fhi-btn-shortcut-link">
          <i class="icon-arrow-right"></i>
          <span class="btn__text">Snarvei 2</span>
        </a>
      </div>
      <div class="col-sm-6 col-md-4 col-lg-3">
        <a href="javascript:void(0)" class="btn fhi-btn-shortcut-link">
          <i class="icon-arrow-right"></i>
          <span class="btn__text">Snarvei 3</span>
        </a>
      </div>
      <div class="col-sm-6 col-md-4 col-lg-3">
        <a href="javascript:void(0)" class="btn fhi-btn-shortcut-link">
          <i class="icon-arrow-right"></i>
          <span class="btn__text">Snarvei 4</span>
        </a>
      </div>
    </div>
  </div>
</footer>`;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
  return ``;
}
