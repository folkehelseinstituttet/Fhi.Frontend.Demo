import { LibraryItem } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemsSharedData as ITEMS } from '../library-items-shared-data';
import { LibraryItemGroupsSharedData as GROUPS } from '../library-item-groups-shared-data';
import { ItemDependencyType, ItemType } from 'src/app/views/shared/item-type.enums';

export const ButtonPrimary: LibraryItem[] = [
  {
    id: ITEMS.ButtonPrimary.id,
    title: ITEMS.ButtonPrimary.title,
    type: ItemType.html,
    exampleHtml: getExampleHtml(),
    codeHtml: getCodeHtml(),
    documentationHtml: getDocumentationHtml(),
    parent: GROUPS.Buttons,
    dependencyType: ItemDependencyType.css,
  },
];

/*
 * Return value is ignored if LibraryItemType is not html
 */
function getExampleHtml(): string {
  return `
<button type="button" class="btn fhi-btn-primary mb-3">
  Hovedhandling
</button>

<br>

<button type="button" class="btn fhi-btn-primary" disabled>
  Deaktivert
</button>`;
}

/*
 * Return empty string to use a copy of exampleHtml as codeHtml.
 * Return null to remove Code from library-item.
 */
function getCodeHtml(): string | null {
  return `
<button type="button" class="btn fhi-btn-primary">
  Hovedhandling
</button>`;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
  return `
<p>
  Primærknapp representerer hovedhandlingen på siden; altså det man ønsker at brukeren skal kunne gjøre i en optimal flyt.
</p>`;
}
