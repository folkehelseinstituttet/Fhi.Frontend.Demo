import { LibraryItemIds } from '../library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemConstants as CONST } from '../../library-item-constants';

export const Accordion: LibraryItem[] = [{
  id: LibraryItemIds.Accordion,
  title: 'Accordion',
  type: LibraryItemType.ngBootstrap,
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
  return `
<ngb-accordion>
  <ngb-panel id="custom-id-0" title="Element #1">
    <ng-template ngbPanelContent>
      <p>Innhold for element #1</p>
    </ng-template>
  </ngb-panel>
  <ngb-panel id="custom-id-1" title="Element #2">
    <ng-template ngbPanelContent>
      <p>Innhold for element #2</p>
    </ng-template>
  </ngb-panel>
  <ngb-panel id="custom-id-2" title="Element #3">
    <ng-template ngbPanelContent>
      <p>Innhold for element #3</p>
    </ng-template>
  </ngb-panel>
</ngb-accordion>`;
}

/*
 * Return null to remove Code from library-item.
 */
function getDocumentationHtml(): string | null {
  return `
<p>
  Bootstrap-dokumentasjon for
  <a href="${CONST.BootstrapComponentsBaseUrl}/accordion">Accordion</a>.
</p>
<p>
  Accordion er implementert som en
  <a href="${CONST.NgBootstrapComponentsBaseUrl}/accordion">NgBootstrap Accordion</a>
  i FHI Designsystem.
</p>
<p>
  Hvis du benytter et annet Javascript-rammeverk må du selv finne passende tredjepartskomponent.
</p>`;
}
