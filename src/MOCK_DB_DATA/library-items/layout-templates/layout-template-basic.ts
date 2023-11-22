import { LibraryItemIds } from '../library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemConstants as CONST } from '../library-item-constants';

export const LayoutTemplateBasic: LibraryItem[] = [
  {
    id: LibraryItemIds.LayoutTemplateBasic,
    title: 'Basic layout',
    type: LibraryItemType.html,
    exampleHtml: getExampleHtml(),
    codeHtml: getCodeHtml(),
    documentationHtml: getDocumentationHtml(),
  },
];

/*
 * Return value is ignored if LibraryItemType is not html
 */
function getExampleHtml(): string {
  return `
<div class="container">
  <div class="row">
    <div class="col-12 border pt-3">
      <p>Innhold i innholdsfelt som går over hele bredden innenfor container.</p>
    </div>
  </div>
</div>`;
}

/*
 * Return empty string to use a copy of exampleHtml as codeHtml.
 * Return null to remove Code from library-item.
 */
function getCodeHtml(): string | null {
  return `
<main class="container">
  <div class="row">
    <div class="col-12">

      <!-- her plasseres innholdet -->

    </div>
  </div>
</main>`;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
  return `
<p>Dette er absolutt minimum for innholdsfeltet som legges under Global Header.</p>`;
}
