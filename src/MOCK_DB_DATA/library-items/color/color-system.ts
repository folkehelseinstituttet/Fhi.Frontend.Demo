import { LibraryItemIds } from '../library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';

export const ColorSystem: LibraryItem[] = [{
  id: LibraryItemIds.ColorSystem,
  title: 'Fargepalett',
  type: LibraryItemType.html,
  exampleHtml: getExampleHtml(),
  codeHtml: getCodeHtml(),
  documentationHtml: getDocumentationHtml()
}];


/*
 * Return value is ignored if LibraryItemType is not html
 */
function getExampleHtml(): string {
  const colorHtml = (hex: string, color: string) => {
    return `
<div class="ds-color-palette d-flex flex-row">
  <div class="ds-color-palette__color ds-color-palette__color--${color}"></div>
  <div class="ds-color-palette__code ms-4 p-2">
    ${hex}
  </div>
  <div class="ds-color-palette__code ms-4 p-2 d-none d-lg-block">
    $${color}
  </div>
</div>`;
  }

  return `
<p class="text-muted small mt-2 mb-0">Lysegrå</p>
${colorHtml('#fbfbfb', 'fhi-grey-light-1')}
${colorHtml('#f7f6f5', 'fhi-grey-light-2')}
${colorHtml('#f0edeb', 'fhi-grey-light-3')}
${colorHtml('#e0dddb', 'fhi-grey-light-4')}

<p class="text-muted small mt-2 mb-0">Grå</p>
${colorHtml('#cfd0cb', 'fhi-grey-1')}
${colorHtml('#9f9f9f', 'fhi-grey-2')}
${colorHtml('#767676', 'fhi-grey-3')}
${colorHtml('#222222', 'fhi-grey-4')}

<p class="text-muted small mt-2 mb-0">Charcoal/Antrasitt</p>
${colorHtml('#333841', 'fhi-charcoal-1')}

<p class="text-muted small mt-2 mb-0">Blågrå</p>
${colorHtml('#f5f8fa', 'fhi-blue-grey-1')}
${colorHtml('#edf4f7', 'fhi-blue-grey-2')}
${colorHtml('#dbe6ec', 'fhi-blue-grey-3')}
${colorHtml('#cbd9df', 'fhi-blue-grey-4')}
${colorHtml('#afc0c7', 'fhi-blue-grey-5')}
${colorHtml('#879ba5', 'fhi-blue-grey-6')}
${colorHtml('#435c68', 'fhi-blue-grey-7')}

<p class="text-muted small mt-2 mb-0">Blå</p>
${colorHtml('#0875b4', 'fhi-blue-1')}
${colorHtml('#393c61', 'fhi-blue-2')}
${colorHtml('#0e4485', 'fhi-blue-3')}

<p class="text-muted small mt-2 mb-0">Grønn</p>
${colorHtml('#cceee4', 'fhi-green-1')}
${colorHtml('#04ab79', 'fhi-green-2')}

<p class="text-muted small mt-2 mb-0">Gul</p>
${colorHtml('#fffdce', 'fhi-yellow-1')}

<p class="text-muted small mt-2 mb-0">Oransje</p>
${colorHtml('#feeed9', 'fhi-orange-1')}
${colorHtml('#f7b665', 'fhi-orange-2')}

<p class="text-muted small mt-2 mb-0">Rød</p>
${colorHtml('#f86559', 'fhi-red-1')}
${colorHtml('#d14641', 'fhi-red-2')}

<p class="text-muted small mt-2 mb-0">Mørkerosa</p>
${colorHtml('#de2968', 'fhi-pink-dark-1')}

<p class="text-muted small mt-2 mb-0">Lyserosa</p>
${colorHtml('#faedec', 'fhi-pink-light-1')}
${colorHtml('#fad1cd', 'fhi-pink-light-2')}
${colorHtml('#fba39b', 'fhi-pink-light-3')}`;
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
