import { LibraryItemIds } from '../library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemConstants as CONST } from '../library-item-constants';

export const HighchartsWithMenuAndMap: LibraryItem[] = [{
  id: LibraryItemIds.HighchartsWithMenuAndMap,
  title: 'FHI Angular Highcharts with menu',
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
  return `
<p>
  Informasjon om hvordan ta i bruk denne modulen finner du her:
  <a href="https://www.npmjs.com/package/@folkehelseinstituttet/angular-highcharts">
    @folkehelseinstituttet/angular-highcharts
  </a>
</p>`;
}