import { LibraryItem } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemsSharedData as ITEMS } from '../library-items-shared-data';
import { LibraryItemGroupsSharedData as GROUPS } from '../library-item-groups-shared-data';
import { LibraryItemConstants as CONST } from '../library-item-constants';
import { ItemDependencyType, ItemType } from 'src/app/views/shared/item-type.enums';

export const ColorSystem: LibraryItem[] = [
  {
    id: ITEMS.VisualIdentityColors.id,
    title: ITEMS.VisualIdentityColors.title,
    titleLang: CONST.languageLocaleId_NO,
    type: ItemType.html,
    exampleHtml: getExampleHtml(),
    codeHtml: getCodeHtml(),
    documentationHtml: getDocumentationHtml(),
    parent: GROUPS.Colors,
    dependencyType: ItemDependencyType.css,
  },
];

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
</div>`;
  };

  return `
<p class="text-muted small mt-2 mb-0">Lysegrå</p>
${colorHtml('#fbfbfb', 'fhi-core-grey-light-1')}
${colorHtml('#f7f6f5', 'fhi-core-grey-light-2')}
${colorHtml('#f0edeb', 'fhi-core-grey-light-3')}
${colorHtml('#e0dddb', 'fhi-core-grey-light-4')}
${colorHtml('#cfd0cb', 'fhi-core-grey-1')}
${colorHtml('#767676', 'fhi-core-grey-3')}

<p class="text-muted small mt-2 mb-0">Tekst</p>
${colorHtml('#222222', 'fhi-core-grey-4')}

<p class="text-muted small mt-2 mb-0">Blågrå</p>
${colorHtml('#edf4f7', 'fhi-core-blue-grey-2')}
${colorHtml('#dbe6ec', 'fhi-core-blue-grey-3')}
${colorHtml('#cbd9df', 'fhi-core-blue-grey-4')}
${colorHtml('#879ba5', 'fhi-core-blue-grey-6')}
${colorHtml('#435c68', 'fhi-core-blue-grey-7')}

<p class="text-muted small mt-2 mb-0">Systemblå</p>
${colorHtml('#0067c4', 'fhi-core-blue-1')}
${colorHtml('#0e4485', 'fhi-core-blue-2')}

<p class="text-muted small mt-2 mb-0">FHI-blå</p>
${colorHtml('#d5ebf5', 'fhi-core-blue-fhi4')}
${colorHtml('#65adc3', 'fhi-core-blue-fhi3')}
${colorHtml('#386e84', 'fhi-core-blue-fhi2')}
${colorHtml('#393c61', 'fhi-core-blue-3')}

<p class="text-muted small mt-2 mb-0">Grønn</p>
${colorHtml('#cceee4', 'fhi-core-green-1')}
${colorHtml('#68cdaf', 'fhi-core-green-1a')}
${colorHtml('#04ab79', 'fhi-core-green-2')}

<p class="text-muted small mt-2 mb-0">Rød</p>
${colorHtml('#fff0f0', 'fhi-core-red-4')}
${colorHtml('#fbd1cd', 'fhi-core-red-3')}
${colorHtml('#f86559', 'fhi-core-red-1')}
${colorHtml('#d14641', 'fhi-core-red-2')}

<p class="text-muted small mt-2 mb-0">Rosa</p>
${colorHtml('#ffe3e2', 'fhi-core-pink-light-1')}
${colorHtml('#de2968', 'fhi-core-pink-dark-1')}

<p class="text-muted small mt-2 mb-0">Oransje</p>
${colorHtml('#feeed9', 'fhi-core-orange-1')}
${colorHtml('#fee191', 'fhi-core-yellow-2')}
${colorHtml('#f7b665', 'fhi-core-orange-2')}
`;
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
