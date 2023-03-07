import { LibraryItemIds } from '../library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemConstants as CONST } from '../library-item-constants';

export const TreeViewBuilder: LibraryItem[] = [{
  id: LibraryItemIds.TreeViewBuilder,
  title: 'angular tree component',
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
<p>Dette er et eksempel på implementering av <a href="https://www.npmjs.com/package/@circlon/angular-tree-component">Circlon Angular Tree Component</a>. Se deres <a href="https://angular2-tree.readme.io/docs">dokumentasjon</a> for flere detaljer om bruk.</p>

<p><strong>Merk:</strong> ved å benytte denne komponenten vil du for øyeblikket få korrekt stilsetting via @folkehelseinstituttet/style. Dog vil denne stilsettingen på et senere tidspunkt fjernes fra stilbiblioteket.</p>

<div class="alert alert-warning mb-5">
  <i class="icon-bell-regular"></i>
  <div>
    <p>Brukes bare på fagsystemer / interne applikasjoner, da den ikke er god nok på universell utforming for offentlig tilgjengelige nettsteder.</p>
  </div>
</div>`;
}
