import { LibraryItem } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemsSharedData as ITEMS } from '../library-items-shared-data';
import { LibraryItemGroupsSharedData as GROUPS } from '../library-item-groups-shared-data';
import { ItemDependencyType, ItemType } from 'src/app/views/shared/item-type.enums';

export const FormControlTextarea: LibraryItem[] = [
  {
    id: ITEMS.FormControlTextarea.id,
    title: ITEMS.FormControlTextarea.title,
    type: ItemType.html,
    exampleHtml: getExampleHtml(),
    codeHtml: getCodeHtml(),
    documentationHtml: getDocumentationHtml(),
    parent: GROUPS.FormControls,
    dependencyType: ItemDependencyType.css,
  },
];

/*
 * Return value is ignored if LibraryItemType is not html
 */
function getExampleHtml(): string {
  return `
<label for="exampleFormControlTextarea1" class="form-label" aria-describedby="hjelpeTekst2">
  Tekstfelt med flere linjer
</label>
<p class="form-text" id="hjelpeTekst2">Hjelpetekst, f.eks "Valgfritt felt"</p>
<textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>`;
}

/*
 * Return empty string to use a copy of exampleHtml as codeHtml.
 * Return null to remove Code from library-item.
 */
function getCodeHtml(): string | null {
  return ``;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
  return null;
}
