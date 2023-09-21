import { UrlSegment } from "src/app/url-segment.constants";
import { LibraryItemGroupsShared } from "src/app/views/shared/models/library-item.model";

/**
 * NB! Item order in this file does matter.
 *
 *  Template for naming:
 *
 *  Items: {
 *    id: 'items',
 *    title: 'Items'
 *    apiEndPoint: 'ItemsData',
 *    parentUrlSegment: UrlSegment.components
 *  },
 */
export const LibraryItemGroupsSharedData: LibraryItemGroupsShared = {

  // Components

  Accordions: {
    id: 'accordions',
    title: 'Accordions',
    apiEndPoint: 'AccordionsData',
    parentUrlSegment: UrlSegment.components
  },
  Alerts: {
    id: 'alerts',
    title: 'Alerts',
    apiEndPoint: 'AlertsData',
    parentUrlSegment: UrlSegment.components
  },
  Badges: {
    id: 'badges',
    title: 'Badges',
    apiEndPoint: 'BadgesData',
    parentUrlSegment: UrlSegment.components
  },
  Breadcrumbs: {
    id: 'breadcrumbs',
    title: 'Breadcrumb',
    apiEndPoint: 'BreadcrumbsData',
    parentUrlSegment: UrlSegment.components
  },
  TimeSelectors: {
    id: 'time-selectors',
    title: 'Time selectors',
    apiEndPoint: 'TimeSelectorsData',
    parentUrlSegment: UrlSegment.components
  },

  // Moduler

  Highcharts: {
    id: 'highcharts',
    title: 'Fhi Angular Highcharts',
    apiEndPoint: 'HighchartsData',
    parentUrlSegment: UrlSegment.modules
  },


  // Layout og sidemaler

  ErrorPages: {
    id: 'error-pages',
    title: 'Error pages',
    apiEndPoint: 'ErrorPagesData',
    parentUrlSegment: UrlSegment.layoutAndPageTemplates
  },
};
