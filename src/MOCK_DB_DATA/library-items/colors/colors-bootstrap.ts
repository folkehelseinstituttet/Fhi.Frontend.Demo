import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemsSharedData as ITEMS } from '../library-items-shared-data';
import { LibraryItemConstants as CONST } from '../library-item-constants';

export const ColorsBootstrap: LibraryItem[] = [
  {
    id: ITEMS.VisualIdentityColorsBootstrap.id,
    title: ITEMS.VisualIdentityColorsBootstrap.title,
    titleLang: CONST.languageLocaleId_NO,
    type: LibraryItemType.html,
    exampleHtml: getExampleHtml(),
    codeHtml: getCodeHtml(),
    documentationHtml: getDocumentationHtml(),
  },
];

/*
 * Return value is ignored if LibraryItemType is not html
 */
function getExampleHtml(): string {
  const colorHtml = (hex: string, color: string, bootstrapName: string, textColor?: string) => {
    const textClass = textColor === 'black' ? '' : ' class="text-white"';
    return `
<div class="ds-color-palette d-flex flex-row">
  <div class="ps-3 pt-2 ds-color-palette__color ds-color-palette__color--${color}">
    <p${textClass}>${bootstrapName}</p>
  </div>
  <div class="ds-color-palette__code ms-4 p-2">
    ${hex}
  </div>
</div>`;
  };

  return `
${colorHtml('#0067c4', 'fhi-core-blue-1', 'Primary')}
${colorHtml('#edf4f7', 'fhi-core-blue-grey-2', 'Secondary', 'black')}
${colorHtml('#cceee4', 'fhi-core-green-1', 'Success', 'black')}
${colorHtml('#dbe6ec', 'fhi-core-blue-grey-3', 'Info', 'black')}
${colorHtml('#feeed9', 'fhi-core-orange-1', 'Warning', 'black')}
${colorHtml('#ffe3e2', 'fhi-core-pink-light-1', 'Danger', 'black')}
${colorHtml('#fbfbfb', 'fhi-core-grey-light-1', 'Light', 'black')}
${colorHtml('#393c61', 'fhi-core-blue-3', 'Dark')}
${colorHtml('#ffffff', 'fhi-core-white', 'White', 'black')}`;
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
