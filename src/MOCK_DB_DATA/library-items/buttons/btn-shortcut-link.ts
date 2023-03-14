import { LibraryItemIds } from '../library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemConstants as CONST } from '../library-item-constants';

export const BtnShortcutLink: LibraryItem[] = [{
  id: LibraryItemIds.ButtonShortcutLink,
  title: 'Shortcut link',
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
<a href="${CONST.voidURL}" class="btn fhi-btn-shortcut-link">
  <i class="icon-arrow-right"></i>
  <span class="btn__text">Snarvei-lenke</span>
</a>
<br>
<a href="${CONST.voidURL}" class="btn fhi-btn-shortcut-link">
  <i class="icon-arrow-left icon-red"></i>
  <span class="btn__text">Snarvei-lenke</span>
</a>`;
}

/*
 * Return empty string to use a copy of exampleHtml as codeHtml.
 * Return null to remove Code from library-item.
 */
function getCodeHtml(): string | null {
  return `
<a href="" class="btn fhi-btn-shortcut-link">
  <i class="icon-arrow-right"></i>
  <span class="btn__text">Snarvei-lenke</span>
</a>

<a href="" class="btn fhi-btn-shortcut-link">
  <i class="icon-arrow-left icon-red"></i>
  <span class="btn__text">Snarvei-lenke</span>
</a>`;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
  return null;
}
