import { LibraryItemIds } from '../library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { includedIcons } from './icon-set.GENERATED';

export const IconSet: LibraryItem[] = [{
  id: LibraryItemIds.IconSet,
  title: 'Ikonsett',
  type: LibraryItemType.html,
  exampleHtml: getExampleHtml(),
  codeHtml: getCodeHtml(),
  documentationHtml: getDocumentationHtml()
}];


/*
 * Return value is ignored if LibraryItemType is not html
 */
function getExampleHtml(): string {
  const icons = includedIcons;
  let iconRender = '';
  for (let i = 0; i < icons.length; i++) {
    if(icons[i].indexOf("fhi-logo") == -1) {
      iconRender += '<div class="ds-icon"><i class="icon-' + icons[i] + '"></i><small class="fhi-text-ancillary">icon-' + icons[i] + '</small></div>';
    }
  }
  return `
<div class="d-flex flex-wrap ds-icons-wrapper">
  ${iconRender}
</div>`;
}

/*
 * Return empty string to use a copy of exampleHtml as codeHtml.
 * Return null to remove Code from library-item.
 */
function getCodeHtml(): string {
  return `
<!-- eksempel på implementering -->
<i class="icon-arrow-down"></i>`;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
  return null;
}
