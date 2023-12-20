import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemsSharedData as ITEMS } from '../library-items-shared-data';
import { LibraryItemConstants as CONST } from '../library-item-constants';

export const TableEditable: LibraryItem[] = [
  {
    id: ITEMS.TableEditable.id,
    title: ITEMS.TableEditable.title,
    type: LibraryItemType.angular,
    exampleHtml: getExampleHtml(),
    codeHtml: getCodeHtml(),
    documentationHtml: getDocumentationHtml(),
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
  return ``;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
  return `
<p>FHI Designsystem vil på sikt tilby en FHI Angular komponent for tabell med innebygget funksjonalitet for redigerbare celler.</p>
  
<p>Om du ønsker å lage en tabell med redigerbare celler før denne komponenten blir tilgjengelig, inspect og finn markup her og lag din egen funksjonalitet.</p>

<p>Merk! Ved bruk av knapper i tabeller er det kun ikon-knapper som skal benyttes.</p>`;
}
