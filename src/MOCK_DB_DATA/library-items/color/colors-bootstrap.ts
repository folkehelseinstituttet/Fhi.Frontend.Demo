import { LibraryItemIds } from 'src/app/library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';

export const ColorsBootstrap: LibraryItem[] = [{
  id: LibraryItemIds.ColorBootstrap,
  title: 'Fargepalett (Bootstrap)',
  type: LibraryItemType.html,
  exampleHtml: getExampleHtml(),
  codeHtml: getCodeHtml(),
  documentationHtml: getDocumentationHtml()
}];

function getExampleHtml(): string {
  return `
${colorHtml('#d14641', 'fhi-red-2', 'Primary')}
${colorHtml('#dbe6ec', 'fhi-blue-grey-2', 'Secondary', 'black')}
${colorHtml('#04ab79', 'fhi-green-2', 'Success')}
${colorHtml('#057e9a', 'fhi-blue-light-2', 'Info')}
${colorHtml('#f7b665', 'fhi-orange-2', 'Warning', 'black')}
${colorHtml('#d01858', 'fhi-pink-dark-2', 'Danger')}
${colorHtml('#fbfbfb', 'fhi-grey-light-1', 'Light', 'black')}
${colorHtml('#393c61', 'fhi-blue-dark-1', 'Dark')}
${colorHtml('#ffffff', 'white', 'White', 'black')}`;
}

function getCodeHtml(): string | null {
  return null;
}

function getDocumentationHtml(): string | null {
  return null;
}

function colorHtml(hex: string, color: string, bootstrapName: string, textColor?: string) {
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
