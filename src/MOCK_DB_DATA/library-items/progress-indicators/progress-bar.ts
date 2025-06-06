import { LibraryItem } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemsSharedData as ITEMS } from '../library-items-shared-data';
import { LibraryItemGroupsSharedData as GROUPS } from '../library-item-groups-shared-data';
import { LibraryItemConstants as CONST } from '../library-item-constants';
import { ItemDependencyType, ItemType } from 'src/app/views/shared/item-type.enums';

export const ProgressBar: LibraryItem[] = [
  {
    id: ITEMS.ProgressBar.id,
    title: ITEMS.ProgressBar.title,
    type: ItemType.angular,
    exampleHtml: getExampleHtml(),
    codeHtml: getCodeHtml(),
    documentationHtml: getDocumentationHtml(),
    parent: GROUPS.ProgressIndicators,
    dependencyType: ItemDependencyType.css,
  },
];

/*
 * Return value is ignored if LibraryItemType is not html
 */
function getExampleHtml(): string {
  return ``;
}

/*
 * Return empty string to use a copy of exampleHtml as codeHtml.
 * Return null to remove Code from library-item.
 */
function getCodeHtml(): string | null {
  return `
<!-- Eksempel i en Angular-komponent -->
<div class="progress">
  <div class="progress-bar"
       role="progressbar"
       aria-label="Label som forteller hva dette er progress på"
       aria-valuemin="0"
       aria-valuemax="100"
       [attr.style]="'width: ' + valueNow + '%;'"
       [attr.aria-valuenow]="valueNow"
  >
    {{ valueNow }}% (eller generell tekst)
  </div>
</div>`;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
  return `
<p>
  FHI Designsystem benytter Bootstraps
  <a href="${CONST.BootstrapComponentsBaseUrl}/progress">Progress</a>.
</p>`;
}
