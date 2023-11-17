import { UrlSegment } from 'src/app/url-segment.constants';
import { LibraryItemGroupsShared } from 'src/app/views/shared/models/library-item.model';

/**
 * NB! Item order in this file does matter.
 *
 *  Template for naming:
 *
 *  Items: {
 *    id: 'items',
 *    lang: 'en',
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
    titleLang: 'en',
    apiEndPoint: 'AccordionsData',
    parentUrlSegment: UrlSegment.components,
  },
  Alerts: {
    id: 'alerts',
    title: 'Alerts',
    titleLang: 'en',
    apiEndPoint: 'AlertsData',
    parentUrlSegment: UrlSegment.components,
  },
  Badges: {
    id: 'badges',
    title: 'Badges',
    titleLang: 'en',
    apiEndPoint: 'BadgesData',
    parentUrlSegment: UrlSegment.components,
  },
  Breadcrumbs: {
    id: 'breadcrumbs',
    title: 'Breadcrumb',
    titleLang: 'en',
    apiEndPoint: 'BreadcrumbsData',
    parentUrlSegment: UrlSegment.components,
  },
  Buttons: {
    id: 'buttons',
    title: 'Buttons',
    titleLang: 'en',
    apiEndPoint: 'ButtonsData',
    parentUrlSegment: UrlSegment.components,
  },
  FormControls: {
    id: 'form-controls',
    title: 'Form controls',
    titleLang: 'en',
    apiEndPoint: 'FormControlsData',
    parentUrlSegment: UrlSegment.components,
  },
  Highcharts: {
    id: 'highcharts',
    title: 'Highcharts',
    titleLang: 'en',
    apiEndPoint: 'HighchartsData',
    parentUrlSegment: UrlSegment.components,
  },
  Navs: {
    id: 'navs',
    title: 'Navigation',
    titleLang: 'en',
    apiEndPoint: 'NavsData',
    parentUrlSegment: UrlSegment.components,
  },
  TimeSelectors: {
    id: 'time-selectors',
    title: 'Time selectors',
    titleLang: 'en',
    apiEndPoint: 'TimeSelectorsData',
    parentUrlSegment: UrlSegment.components,
  },

  // Layout og sidemaler

  ErrorPages: {
    id: 'error-pages',
    title: 'Error pages',
    titleLang: 'en',
    apiEndPoint: 'ErrorPagesData',
    parentUrlSegment: UrlSegment.layoutAndPageTemplates,
  },
};
