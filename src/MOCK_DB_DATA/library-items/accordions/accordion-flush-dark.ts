import { LibraryItem } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemsSharedData as ITEMS } from '../library-items-shared-data';
import { LibraryItemGroupsSharedData as GROUPS } from '../library-item-groups-shared-data';
import { LibraryItemConstants as CONST } from '../library-item-constants';
import { ItemDependencyType, ItemType } from 'src/app/views/shared/item-type.enums';

export const AccordionFlushDark: LibraryItem[] = [
  {
    id: ITEMS.AccordionFlushDark.id,
    title: ITEMS.AccordionFlushDark.title,
    type: ItemType.angular,
    exampleHtml: getExampleHtml(),
    codeHtml: getCodeHtml(),
    documentationHtml: getDocumentationHtml(),
    parent: GROUPS.Accordions,
    dependencyType: ItemDependencyType.ngBootstrap,
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
<div class="accordion-flush fhi-accordion-flush" ngbAccordion>
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
