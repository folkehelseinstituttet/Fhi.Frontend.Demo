import { LibraryItemsShared } from "src/app/views/shared/models/library-item.model";

/**
 * NB! Item order in this file doesn't have any effect.
 *     If you want to change order within a group this
 *     is done in src\MOCK_DB_DATA\library-items\foo\foo.data.ts
 *
 *     export const FooItems: LibraryItem[] = [
 *       ...FooBar,
 *       ...FooBaz
 *     ];
 */
export const LibraryItemsSharedData: LibraryItemsShared = {
  ErrorPage404: {
    id: 'errorpage404',
    title: '404 - page not found'
  },
  Highcharts: {
    id: 'highcharts',
    title: 'FHI Angular Highcharts - basic setup'
  },
  HighchartsWithMenu: {
    id: 'highchartswithmenu',
    title: 'FHI Angular Highcharts - with menu'
  },
  HighchartsWithMenuAndFooter: {
    id: 'highchartswithmenuandfooter',
    title: 'FHI Angular Highcharts - with menu and footer'
  }
};
