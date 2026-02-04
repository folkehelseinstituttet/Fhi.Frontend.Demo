import { LibraryItem } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemsSharedData as ITEMS } from '../library-items-shared-data';
import { LibraryItemGroupsSharedData as GROUPS } from '../library-item-groups-shared-data';
import { ItemDependencyType, ItemType } from 'src/app/views/shared/item-type.enums';

export const HighchartsMapWithSlot: LibraryItem[] = [
  {
    id: ITEMS.HighchartsMapWithSlot.id,
    title: ITEMS.HighchartsMapWithSlot.title,
    type: ItemType.angular,
    exampleHtml: getExampleHtml(),
    codeHtml: getCodeHtml(),
    documentationHtml: getDocumentationHtml(),
    parent: GROUPS.Highcharts,
    dependencyType: ItemDependencyType.fhiAngular,
  },
];

function getExampleHtml(): string {
  return ``;
}
function getCodeHtml(): string | null {
  return `<fhi-angular-highcharts 
  [diagramOptions]="diagramOptions"
  <div fhi-map-panel-slot>
    <!-- Your filter content here -->
  </div>
</fhi-angular-highcharts>`;
}
function getDocumentationHtml(): string | null {
  return `<p>This example demonstrates how to use the map panel slot to add custom filters alongside map visualizations.</p>`;
}
