import { UrlSegment } from "src/app/url-segment.constants";
import { LibraryItemGroupsShared } from "src/app/views/shared/models/library-item.model";

export const LibraryItemGroupsSharedData: LibraryItemGroupsShared = {

  // Moduler

  FhiAngularHighcharts: {
    id: 'fhiangularhighcharts',
    title: 'Fhi Angular Highcharts',
    apiEndPoint: 'HighchartsGroupData',
    parentUrlSegment: UrlSegment.modules
  },

  
  // Layout og sidemaler

  ErrorPages: {
    id: 'errorpages',
    title: 'Error pages',
    apiEndPoint: 'ErrorPagesGroupData',
    parentUrlSegment: UrlSegment.layoutAndPageTemplates
  },
};
