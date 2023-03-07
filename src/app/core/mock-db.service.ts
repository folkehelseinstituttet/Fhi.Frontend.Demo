import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

// All item ids
import { LibraryItemIds } from 'src/MOCK_DB_DATA/library-items/library-item-ids';

// All items for debuggings page
import { AllData } from 'src/MOCK_DB_DATA/library-items/library-items.data';

// Items
import { AccordionData } from 'src/MOCK_DB_DATA/library-items/accordion/_accordion.data';
import { AdvancedSelectData } from 'src/MOCK_DB_DATA/library-items/advanced-select/_advanced-select.data';
import { AlertsData } from 'src/MOCK_DB_DATA/library-items/alerts/_alerts.data';
import { AngularTreeComponentData } from 'src/MOCK_DB_DATA/library-items/treeview/_treeview.data';
import { BadgeData } from 'src/MOCK_DB_DATA/library-items/badge/_badge.data';
import { BreadcrumbData } from 'src/MOCK_DB_DATA/library-items/breadcrumb/_breadcrumb.data';
import { ButtonGroupData } from 'src/MOCK_DB_DATA/library-items/button-group/_button-group.data';
import { ButtonsData } from 'src/MOCK_DB_DATA/library-items/buttons/_buttons.data';
import { ColorData } from 'src/MOCK_DB_DATA/library-items/color/_color.data';
import { DateAndTimeData } from 'src/MOCK_DB_DATA/library-items/date-and-time/_date-and-time.data';
import { DatepickerData } from 'src/MOCK_DB_DATA/library-items/datepicker/_datepicker.data';
import { DrawerData } from 'src/MOCK_DB_DATA/library-items/drawer/_drawer.data';
import { HighchartsData } from 'src/MOCK_DB_DATA/library-items/highcharts/_highcharts.data';
import { FormsData } from 'src/MOCK_DB_DATA/library-items/forms/_forms.data';
import { GlobalFooterData } from 'src/MOCK_DB_DATA/library-items/global-footer/_global-footer.data';
import { GlobalHeaderData } from 'src/MOCK_DB_DATA/library-items/global-header/_global-header.data';
import { IconsData } from 'src/MOCK_DB_DATA/library-items/icons/_icons.data';
import { LayoutTemplatesData } from 'src/MOCK_DB_DATA/library-items/layout-templates/_layout-templates.data';
import { ModalData } from 'src/MOCK_DB_DATA/library-items/modal/_modal.data';
import { PaginationData } from 'src/MOCK_DB_DATA/library-items/pagination/_pagination.data';
import { PrototypeFormsData } from 'src/MOCK_DB_DATA/library-items/prototype-forms/_prototype-forms.data';
import { PrototypePageheaderData } from 'src/MOCK_DB_DATA/library-items/prototype-pageheader/_prototype-pageheader.data';
import { PrototypeTableWithExpandableContentData } from 'src/MOCK_DB_DATA/library-items/prototype-table-with-expandable-content/_prototype-table-with-expandable-content.data';
import { SearchData } from 'src/MOCK_DB_DATA/library-items/search/_search.data';
import { SpinnersData } from 'src/MOCK_DB_DATA/library-items/spinners/_spinners.data';
import { TableData } from 'src/MOCK_DB_DATA/library-items/table/_table.data';
import { TabsData } from 'src/MOCK_DB_DATA/library-items/tabs/_tabs.data';
import { TagsData } from 'src/MOCK_DB_DATA/library-items/tags/_tags.data';
import { NavigationtileData } from 'src/MOCK_DB_DATA/library-items/navigation-tile/_navigation-tile.data';
import { ToastData } from 'src/MOCK_DB_DATA/library-items/toast/_toast.data';
import { TooltipData } from 'src/MOCK_DB_DATA/library-items/tooltip/_tooltip.data';
import { TreeviewData } from 'src/MOCK_DB_DATA/library-items/treeview/_treeview.data';
import { TypographyData } from 'src/MOCK_DB_DATA/library-items/typography/_typography.data';

@Injectable({
  providedIn: 'root'
})
export class MockDbService implements InMemoryDbService {
  createDb(): object {
    return {
      LibraryItemIds,
      AllData,

      // Items
      AccordionData,
      AdvancedSelectData,
      AlertsData,
      AngularTreeComponentData,
      BadgeData,
      BreadcrumbData,
      ButtonGroupData,
      ButtonsData,
      ColorData,
      DateAndTimeData,
      DatepickerData,
      DrawerData,
      HighchartsData,
      FormsData,
      GlobalFooterData,
      GlobalHeaderData,
      IconsData,
      LayoutTemplatesData,
      ModalData,
      PaginationData,
      PrototypeFormsData,
      PrototypePageheaderData,
      PrototypeTableWithExpandableContentData,
      SearchData,
      SpinnersData,
      TableData,
      TabsData,
      TagsData,
      NavigationtileData,
      ToastData,
      TooltipData,
      TreeviewData,
      TypographyData
    };
  }
}
