import { LibraryItemsShared } from "src/app/views/shared/models/library-item.model";

/**
 * NB! Item order in this file doesn't have any effect.
 *     If you want to change order within a group this
 *     is done in src\MOCK_DB_DATA\library-items\[item-group]\[item-group].data.ts
 *
 *  Template for naming:
 *
 *  Item: {
 *    id: 'item-one',
 *    title: 'Item - one'
 *  },
 *  ItemTwo: {
 *    id: 'item-two',
 *    title: 'Item - two'
 *  },
 */
export const LibraryItemsSharedData: LibraryItemsShared = {
  Accordion: {
    id: 'accordion',
    title: 'Accordion'
  },
  AccordionFlush: {
    id: 'accordion-flush',
    title: 'Accordion - flush'
  },
  AccordionFlushDark: {
    id: 'accordion-flush-dark',
    title: 'Accordion - flush dark'
  },
  AlertBasic: {
    id: 'alert-basic',
    title: 'Alert'
  },
  AlertClosable: {
    id: 'alert-closable',
    title: 'Alert - closable'
  },
  BadgeCircular: {
    id: 'badge-circular',
    title: 'Badge - circular'
  },
  BadgeRounded: {
    id: 'badge-rounded',
    title: 'Badge - rounded'
  },
  Breadcrumb: {
    id: 'breadcrumb',
    title: 'Breadcrumb'
  },
  ErrorPage404: {
    id: 'error-page-404',
    title: 'Error page - 404'
  },
  ErrorPage500: {
    id: 'error-page-500',
    title: 'Error page - 500'
  },
  HighchartsWithoutMenu: {
    id: 'highcharts-without-menu',
    title: 'FHI Angular Highcharts - without menu'
  },
  HighchartsWithMenu: {
    id: 'highcharts-with-menu',
    title: 'FHI Angular Highcharts - with menu'
  },
  HighchartsWithMenuAndFooter: {
    id: 'highcharts-with-menu-and-footer',
    title: 'FHI Angular Highcharts - with menu and footer'
  }
};
