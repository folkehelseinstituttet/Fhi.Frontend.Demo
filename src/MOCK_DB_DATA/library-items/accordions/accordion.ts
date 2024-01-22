import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemsSharedData as ITEMS } from '../library-items-shared-data';
import { LibraryItemConstants as CONST } from '../library-item-constants';

export const Accordion: LibraryItem[] = [
  {
    id: ITEMS.Accordion.id,
    title: ITEMS.Accordion.title,
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
  return `
<div ngbAccordion>
  @for (item of accordionItems; track item) {
    <div ngbAccordionItem [collapsed]="item !== 'First'">
      <h2 ngbAccordionHeader>
        <button ngbAccordionButton>Element #{{ item }}</button>
      </h2>
      <div ngbAccordionCollapse>
        <div ngbAccordionBody>
          <ng-template>Innhold element #{{ item }}</ng-template>
        </div>
      </div>
    </div>
  }
</div>`;
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
