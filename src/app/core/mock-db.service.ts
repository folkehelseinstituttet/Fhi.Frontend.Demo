import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

// All item ids
import { LibraryItemIds } from 'src/MOCK_DB_DATA/library-items/library-item-ids';

// All items for debuggings page
import { AllData } from 'src/MOCK_DB_DATA/library-items/library-items.data';

// Items

// -----------------------------------------
//
// New id and title implementation!
//
// -----------------------------------------

import { LibraryItemsSharedData } from 'src/MOCK_DB_DATA/library-items/library-items-shared-data';
import { LibraryItemGroupsSharedData } from 'src/MOCK_DB_DATA/library-items/library-item-groups-shared-data';

import { AccordionsData } from 'src/MOCK_DB_DATA/library-items/accordions/_accordions.data';
import { AlertsData } from 'src/MOCK_DB_DATA/library-items/alerts/_alerts.data';
import { BadgesData } from 'src/MOCK_DB_DATA/library-items/badges/_badges.data';
import { BreadcrumbsData } from 'src/MOCK_DB_DATA/library-items/breadcrumbs/_breadcrumbs.data';
import { ButtonsData } from 'src/MOCK_DB_DATA/library-items/buttons/_buttons.data';
import { CardsData } from 'src/MOCK_DB_DATA/library-items/cards/_cards.data';
import { ColorsData } from 'src/MOCK_DB_DATA/library-items/colors/_colors.data';
import { DrawersData } from 'src/MOCK_DB_DATA/library-items/drawers/_drawers.data';
import { ErrorPagesData } from 'src/MOCK_DB_DATA/library-items/error-pages/_error-pages.data';
import { FormControlsData } from 'src/MOCK_DB_DATA/library-items/form-controls/_form-controls.data';
import { GlobalFootersData } from 'src/MOCK_DB_DATA/library-items/global-footers/_global-footers.data';
import { GlobalHeadersData } from 'src/MOCK_DB_DATA/library-items/global-headers/_global-headers.data';
import { HighchartsData } from 'src/MOCK_DB_DATA/library-items/highcharts/_highcharts.data';
import { IconsData } from 'src/MOCK_DB_DATA/library-items/icons/_icons.data';
import { LayoutTemplatesData } from 'src/MOCK_DB_DATA/library-items/layout-templates/_layout-templates.data';
import { ModalsData } from 'src/MOCK_DB_DATA/library-items/modals/_modals.data';
import { NavsData } from 'src/MOCK_DB_DATA/library-items/navs/_navs.data';
import { PaginationsData } from 'src/MOCK_DB_DATA/library-items/paginations/_paginations.data';
import { ProgressIndicatorsData } from 'src/MOCK_DB_DATA/library-items/progress-indicators/_progress-indicators.data';
import { TreeViewBuilderData } from 'src/MOCK_DB_DATA/library-items/tree-view-builder/_tree-view-builder.data';
import { PrototypeFormsData } from 'src/MOCK_DB_DATA/library-items/prototype-forms/_prototype-forms.data';
import { PrototypeTablesData } from 'src/MOCK_DB_DATA/library-items/prototype-tables/_prototype-tables.data';
import { SearchData } from 'src/MOCK_DB_DATA/library-items/search/_search.data';
import { TablesData } from 'src/MOCK_DB_DATA/library-items/tables/_tables.data';
import { TagsData } from 'src/MOCK_DB_DATA/library-items/tags/_tags.data';
import { TimeSelectorsData } from 'src/MOCK_DB_DATA/library-items/time-selectors/_time-selectors.data';
import { ToastsData } from 'src/MOCK_DB_DATA/library-items/toasts/_toasts.data';
import { TooltipPopoverData } from 'src/MOCK_DB_DATA/library-items/tooltip-popover/_tooltip-popover.data';
import { TreeViewsData } from 'src/MOCK_DB_DATA/library-items/tree-views/_tree-views.data';
import { TypographyData } from 'src/MOCK_DB_DATA/library-items/typography/_typography.data';

// TODO: make logic for reading developer/debug/all in LibraryItemGroupsDataService
// const AllLibraryItemsData: LibraryItem[] = [
//   ...HighchartsData.libraryItems,
// ];

@Injectable({
  providedIn: 'root',
})
export class MockDbService implements InMemoryDbService {
  createDb(): object {
    return {
      LibraryItemsSharedData,
      LibraryItemGroupsSharedData,

      // Items
      AccordionsData,
      AlertsData,
      BadgesData,
      BreadcrumbsData,
      ButtonsData,
      CardsData,
      ColorsData,
      DrawersData,
      ErrorPagesData,
      FormControlsData,
      GlobalFootersData,
      GlobalHeadersData,
      HighchartsData,
      IconsData,
      LayoutTemplatesData,
      ModalsData,
      NavsData,
      PaginationsData,
      ProgressIndicatorsData,
      TreeViewBuilderData,
      PrototypeFormsData,
      PrototypeTablesData,
      SearchData,
      TablesData,
      TagsData,
      TimeSelectorsData,
      ToastsData,
      TooltipPopoverData,
      TreeViewsData,
      TypographyData,

      LibraryItemIds, // TODO: deprecate when all items use new system
      AllData, // TODO: deprecate when all items use new system
    };
  }
}
