import { LibraryItemGroupsShared } from "src/app/views/shared/models/library-item.model";

export const LibraryItemGroupsSharedData: LibraryItemGroupsShared = {
  FhiAngularHighcharts: {
    id: 'fhiangularhighcharts', // Must be uniqe! Also used as segment in URL.
    title: 'Fhi Angular Highcharts',
    apiEndPoint: 'HighchartsGroupData', // Same as name on exported LibraryItemGroup constant name.
  }
};

