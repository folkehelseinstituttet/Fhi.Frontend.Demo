import { LibraryItem } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemsSharedData as ITEMS } from '../library-items-shared-data';
import { LibraryItemGroupsSharedData as GROUPS } from '../library-item-groups-shared-data';
import { LibraryItemConstants as CONST } from '../library-item-constants';
import { ItemDependencyType, ItemType } from 'src/app/views/shared/item-type.enums';

export const TooltipPopover: LibraryItem[] = [
  {
    id: ITEMS.TooltipPopover.id,
    title: ITEMS.TooltipPopover.title,
    type: ItemType.angular,
    exampleHtml: getExampleHtml(),
    codeHtml: getCodeHtml(),
    documentationHtml: getDocumentationHtml(),
    parent: GROUPS.TooltipPopovers,
    dependencyType: ItemDependencyType.ngBootstrap,
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
<button type="button"
        class="fhi-tag fhi-tag--category"
        [autoClose]="'outside'"
        [ngbPopover]="popContent">Aktiver popover</button>

<p class="mt-6">
  Popover kan også brukes i løpende tekst.

  <a role="button"
     class="fhi-popover-trigger"
     tabindex="0"
     triggers="manual"
     #p="ngbPopover"
     (click)="p.toggle()"
     (keydown.enter)="p.toggle()"
     [autoClose]="'outside'"
     [ngbPopover]="popContent">Klikk her for popover</a>.
</p>

<ng-template #popContent>
  <p>Innholdet i popover</p>
  <ul>
    <li>Kan inneholde</li>
    <li>Rik tekst</li>
  </ul>
</ng-template>`;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
  return `
<p>
  Bootstrap-dokumentasjon for
  <a href="${CONST.BootstrapComponentsBaseUrl}/popovers">Popovers</a>
</p>
<p>
  Popover er implementert som
  <a href="${CONST.NgBootstrapComponentsBaseUrl}/popover">NgBootstrap Popover</a>
  i FHI Designsystem.
</p>
<p>
  Hvis du benytter et annet Javascript-rammeverk må du selv finne passende tredjepartskomponent.
</p>`;
}
