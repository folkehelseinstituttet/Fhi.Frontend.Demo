import { LibraryItemIds } from '../library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';

export const ColorsBootstrap: LibraryItem[] = [{
  id: LibraryItemIds.ColorBootstrap,
  title: 'Fargepalett (Bootstrap)',
  type: LibraryItemType.html,
  exampleHtml: getExampleHtml(),
  codeHtml: getCodeHtml(),
  documentationHtml: getDocumentationHtml()
}];


/*
 * Return value is ignored if LibraryItemType is not html
 */
function getExampleHtml(): string {
  const colorHtml = (hex: string, color: string, bootstrapName: string, textColor?: string) => {
    const textClass = (textColor === 'black') ? '' : ' class="text-white"';
    return `
<div class="ds-color-palette d-flex flex-row">
  <div class="ps-3 pt-2 ds-color-palette__color ds-color-palette__color--${color}">
    <p${textClass}>${bootstrapName}</p>
  </div>
  <div class="ds-color-palette__code ms-4 p-2">
    ${hex}
  </div>
  <div class="ds-color-palette__code ms-4 p-2 d-none d-lg-block">
    $${color}
  </div>
</div>`;
  }

  return `
${colorHtml('#d14641', 'fhi-red-2', 'Primary')}
${colorHtml('#dbe6ec', 'fhi-blue-grey-2', 'Secondary', 'black')}
${colorHtml('#cceee4', 'fhi-green-1', 'Success', 'black')}
${colorHtml('#dbe6ec', 'fhi-blue-grey-2', 'Info', 'black')}
${colorHtml('#feeed9', 'fhi-orange-1', 'Warning', 'black')}
${colorHtml('#ffe3e2', 'fhi-pink-light-3', 'Danger', 'black')}
${colorHtml('#fbfbfb', 'fhi-grey-light-1', 'Light', 'black')}
${colorHtml('#393c61', 'fhi-blue-dark-1', 'Dark')}
${colorHtml('#ffffff', 'white', 'White', 'black')}`;
}

/*
 * Return empty string to use a copy of exampleHtml as codeHtml.
 * Return null to remove Code from library-item.
 */
function getCodeHtml(): string | null {
  return null;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
  return null;
}
