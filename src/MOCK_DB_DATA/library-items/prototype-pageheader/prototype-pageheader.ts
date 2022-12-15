import { LibraryItemIds } from '../library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemConstants as CONST } from '../library-item-constants';

export const PrototypePageheader: LibraryItem[] = [{
  id: LibraryItemIds.PrototypePageheader,
  title: 'Pageheader FHI Statistikk',
  type: LibraryItemType.fhiAngular,
  exampleHtml: getExampleHtml(),
  codeHtml: getCodeHtml(),
  documentationHtml: getDocumentationHtml(),
  fullScreenEnabled: true
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
<div class="alert alert-warning">
  <i class="icon-info-circle"></i>
  <div>
    <h2 class="h5">Disclaimer!</strong></h2>
    <p>Dette er et POC på et navigasjonsystem designet for FHI Statistikk.</p>
    <p class="mb-0">Fra designsystemet benyttes her <a href="/developer/modules/GlobalHeader">Global header</a> og Menu button fra <a href="/developer/components/Buttons">knappekomponenter</a></p>
  </div>
</div>`;
}
