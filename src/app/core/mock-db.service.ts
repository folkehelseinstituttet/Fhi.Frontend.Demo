import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

// All item ids
import { LibraryItemIds } from 'src/MOCK_DB_DATA/library-items/library-item-ids';

// All items for debuggings page
import { AllData } from 'src/MOCK_DB_DATA/library-items/library-items.data';

// Items
import { PrototypeAngularTreeData } from 'src/MOCK_DB_DATA/library-items/prototype-angular-tree/_prototype-angular-tree.data';
import { DrawerData } from 'src/MOCK_DB_DATA/library-items/drawer/_drawer.data';
import { GlobalFooterData } from 'src/MOCK_DB_DATA/library-items/global-footer/_global-footer.data';
import { GlobalHeaderData } from 'src/MOCK_DB_DATA/library-items/global-header/_global-header.data';
import { LayoutTemplatesData } from 'src/MOCK_DB_DATA/library-items/layout-templates/_layout-templates.data';
import { PrototypeFormsData } from 'src/MOCK_DB_DATA/library-items/prototype-forms/_prototype-forms.data';
import { PrototypePageheaderData } from 'src/MOCK_DB_DATA/library-items/prototype-pageheader/_prototype-pageheader.data';
import { PrototypeTableWithExpandableContentData } from 'src/MOCK_DB_DATA/library-items/prototype-table-with-expandable-content/_prototype-table-with-expandable-content.data';
import { ProgressIndicatorsData } from 'src/MOCK_DB_DATA/library-items/progress-indicators/_progress-indicators.data';
import { TableData } from 'src/MOCK_DB_DATA/library-items/table/_table.data';
import { TagsData } from 'src/MOCK_DB_DATA/library-items/tags/_tags.data';
import { ToastData } from 'src/MOCK_DB_DATA/library-items/toast/_toast.data';
import { TootipPopoverData } from 'src/MOCK_DB_DATA/library-items/tooltip-popover/_tooltip-popover.data';
import { TreeViewData } from 'src/MOCK_DB_DATA/library-items/tree-view/_tree-view.data';

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
import { ErrorPagesData } from 'src/MOCK_DB_DATA/library-items/error-pages/_error-pages.data';
import { FormControlsData } from 'src/MOCK_DB_DATA/library-items/form-controls/_form-controls.data';
import { HighchartsData } from 'src/MOCK_DB_DATA/library-items/highcharts/_highcharts.data';
import { IconsData } from 'src/MOCK_DB_DATA/library-items/icons/_icons.data';
import { ModalsData } from 'src/MOCK_DB_DATA/library-items/modals/_modals.data';
import { NavsData } from 'src/MOCK_DB_DATA/library-items/navs/_navs.data';
import { PaginationsData } from 'src/MOCK_DB_DATA/library-items/paginations/_paginations.data';
import { SearchData } from 'src/MOCK_DB_DATA/library-items/search/_search.data';
import { TimeSelectorsData } from 'src/MOCK_DB_DATA/library-items/time-selectors/_time-selectors.data';
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
      ErrorPagesData,
      FormControlsData,
      HighchartsData,
      IconsData,
      ModalsData,
      NavsData,
      PaginationsData,
      SearchData,
      TimeSelectorsData,
      TypographyData,

      // Items OLD: deprecate when all items use new system
      PrototypeAngularTreeData,
      DrawerData,
      GlobalFooterData,
      GlobalHeaderData,
      LayoutTemplatesData,
      PrototypeFormsData,
      PrototypePageheaderData,
      PrototypeTableWithExpandableContentData,
      ProgressIndicatorsData,
      TableData,
      TagsData,
      ToastData,
      TootipPopoverData,
      TreeViewData,

      LibraryItemIds, // TODO: deprecate when all items use new system
      AllData, // TODO: deprecate when all items use new system
    };
  }
}
