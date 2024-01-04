import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemsSharedData as ITEMS } from '../library-items-shared-data';
import { LibraryItemConstants as CONST } from '../library-item-constants';

export const TreeViewBuilder: LibraryItem[] = [
  {
    id: ITEMS.TreeViewBuilder.id,
    title: ITEMS.TreeViewBuilder.title,
    type: LibraryItemType.fhiAngular,
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
<p>
  FHI Angular Tree View Builder er et eksempel på implementering av en
  <a href="https://www.npmjs.com/package/@ali-hm/angular-tree-component">Circlon Angular Tree Component (fork)</a>.
  Se deres <a href="https://angular2-tree.readme.io/docs">dokumentasjon</a> for flere detaljer om bruk.
</p>
<div class="alert alert-warning mb-5">
  <i class="icon-bell"></i>
  <div>
    <p>
      Brukes bare på fagsystemer / interne applikasjoner, da den ikke er god
      nok på universell utforming for offentlig tilgjengelige nettsteder.
    </p>
  </div>
</div>`;
}
