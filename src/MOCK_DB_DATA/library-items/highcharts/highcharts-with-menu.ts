import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemsSharedData } from '../library-items-shared-data';

export const HighchartsWithMenu: LibraryItem[] = [{
  id: LibraryItemsSharedData.HighchartsWithMenu.id,
  title: LibraryItemsSharedData.HighchartsWithMenu.title,
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
  return `<fhi-angular-highcharts [diagramOptions]="diagramOptions"></fhi-angular-highcharts>`;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
  return null;
}
