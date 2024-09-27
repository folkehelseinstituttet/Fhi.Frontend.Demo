import { UrlSegment } from 'src/app/url-segment.constants';
import { LibraryItemGroupsShared } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemConstants } from './library-item-constants';

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
  // Visuell identitet

  Colors: {
    id: 'colors',
    title: 'Farger',
    titleLang: LibraryItemConstants.languageLocaleId_NO,
    apiEndPoint: 'ColorsData',
    parentUrlSegment: UrlSegment.visualIdentity,
  },
  Icons: {
    id: 'icons',
    title: 'Ikoner',
    titleLang: LibraryItemConstants.languageLocaleId_NO,
    apiEndPoint: 'IconsData',
    parentUrlSegment: UrlSegment.visualIdentity,
  },
  Typography: {
    id: 'typography',
    title: 'Typografi',
    titleLang: LibraryItemConstants.languageLocaleId_NO,
    apiEndPoint: 'TypographyData',
    parentUrlSegment: UrlSegment.visualIdentity,
  },

  // Components

  Accordions: {
    id: 'accordions',
    title: 'Accordions',
    apiEndPoint: 'AccordionsData',
    parentUrlSegment: UrlSegment.components,
  },
  Alerts: {
    id: 'alerts',
    title: 'Alerts',
    apiEndPoint: 'AlertsData',
    parentUrlSegment: UrlSegment.components,
  },
  Badges: {
    id: 'badges',
    title: 'Badges',
    apiEndPoint: 'BadgesData',
    parentUrlSegment: UrlSegment.components,
  },
  Breadcrumbs: {
    id: 'breadcrumbs',
    title: 'Breadcrumbs',
    apiEndPoint: 'BreadcrumbsData',
    parentUrlSegment: UrlSegment.components,
  },
  Buttons: {
    id: 'buttons',
    title: 'Buttons',
    apiEndPoint: 'ButtonsData',
    parentUrlSegment: UrlSegment.components,
  },
  Cards: {
    id: 'cards',
    title: 'Cards',
    apiEndPoint: 'CardsData',
    parentUrlSegment: UrlSegment.components,
  },

  FormControls: {
    id: 'form-controls',
    title: 'Form controls',
    apiEndPoint: 'FormControlsData',
    parentUrlSegment: UrlSegment.components,
  },
  GlobalFooters: {
    id: 'global-footers',
    title: 'Global footers',
    apiEndPoint: 'GlobalFootersData',
    parentUrlSegment: UrlSegment.components,
  },
  GlobalHeaders: {
    id: 'global-headers',
    title: 'Global headers',
    apiEndPoint: 'GlobalHeadersData',
    parentUrlSegment: UrlSegment.components,
  },
  Highcharts: {
    id: 'highcharts',
    title: 'Highcharts',
    apiEndPoint: 'HighchartsData',
    parentUrlSegment: UrlSegment.components,
  },
  Modals: {
    id: 'modals',
    title: 'Modals',
    apiEndPoint: 'ModalsData',
    parentUrlSegment: UrlSegment.components,
  },
  Navs: {
    id: 'navs',
    title: 'Navigation',
    apiEndPoint: 'NavsData',
    parentUrlSegment: UrlSegment.components,
  },
  Paginations: {
    id: 'pagination',
    title: 'Pagination',
    apiEndPoint: 'PaginationsData',
    parentUrlSegment: UrlSegment.components,
  },
  ProgressIndicators: {
    id: 'progress-indicators',
    title: 'Progress indicators',
    apiEndPoint: 'ProgressIndicatorsData',
    parentUrlSegment: UrlSegment.components,
  },
  Search: {
    id: 'search',
    title: 'Search',
    apiEndPoint: 'SearchData',
    parentUrlSegment: UrlSegment.components,
  },
  Tables: {
    id: 'tables',
    title: 'Tables',
    apiEndPoint: 'TablesData',
    parentUrlSegment: UrlSegment.components,
  },
  Tags: {
    id: 'tags',
    title: 'Tags',
    apiEndPoint: 'TagsData',
    parentUrlSegment: UrlSegment.components,
  },
  TimeSelectors: {
    id: 'time-selectors',
    title: 'Time selectors',
    apiEndPoint: 'TimeSelectorsData',
    parentUrlSegment: UrlSegment.components,
  },
  Toasts: {
    id: 'toasts',
    title: 'Toasts',
    apiEndPoint: 'ToastsData',
    parentUrlSegment: UrlSegment.components,
  },
  TooltipPopovers: {
    id: 'tooltip-popover',
    title: 'Tooltip & Popover',
    apiEndPoint: 'TooltipPopoverData',
    parentUrlSegment: UrlSegment.components,
  },
  TreeViews: {
    id: 'tree-views',
    title: 'Tree views',
    apiEndPoint: 'TreeViewsData',
    parentUrlSegment: UrlSegment.components,
  },
};
