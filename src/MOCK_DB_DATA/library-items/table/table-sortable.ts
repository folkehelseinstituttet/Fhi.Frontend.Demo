import { LibraryItemIds } from '../library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemConstants as CONST } from '../library-item-constants';

export const TableSortable: LibraryItem[] = [{
  id: LibraryItemIds.TableSortable,
  title: 'Table - sortable',
  type: LibraryItemType.fhiAngular,
  exampleHtml: getExampleHtml(),
  codeHtml: getCodeHtml(),
  documentationHtml: getDocumentationHtml()
}];


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
<p>FHI Designsystem vil på sikt tilby en FHI Angular komponent for tabell med innebygget sortering.</p>

<p>Om du ønsker å lage en sorterbar tabell før denne komponenten blir tilgjengelig, inspect og finn markup her (husk <code>aria-sort</code> på <code>&lt;th&gt;</code> for uu og korrekt stilsetting). Benytt gjerne <a href="${CONST.NgBootstrapComponentsBaseUrl}/table/overview#examples" target="_blank" rel="noopener noreferrer">NgBootstrap sitt eksempel</a> for funksjonalitet.</p>`;
}
