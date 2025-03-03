import { LibraryItem } from '../views/shared/models/library-item.model';

// Meta data
import { LibraryItemsSharedData } from 'src/MOCK_DB_DATA/library-items/library-items-shared-data';
import { LibraryItemGroupsSharedData } from 'src/MOCK_DB_DATA/library-items/library-item-groups-shared-data';

// Visuell identitet
import { ColorsData } from 'src/MOCK_DB_DATA/library-items/colors/_colors.data';
import { IconsData } from 'src/MOCK_DB_DATA/library-items/icons/_icons.data';
import { TypographyData } from 'src/MOCK_DB_DATA/library-items/typography/_typography.data';

// Komponenter
import { AccordionsData } from 'src/MOCK_DB_DATA/library-items/accordions/_accordions.data';
import { AlertsData } from 'src/MOCK_DB_DATA/library-items/alerts/_alerts.data';
import { BadgesData } from 'src/MOCK_DB_DATA/library-items/badges/_badges.data';
import { BreadcrumbsData } from 'src/MOCK_DB_DATA/library-items/breadcrumbs/_breadcrumbs.data';
import { ButtonsData } from 'src/MOCK_DB_DATA/library-items/buttons/_buttons.data';
import { CardsData } from 'src/MOCK_DB_DATA/library-items/cards/_cards.data';
import { FormControlsData } from 'src/MOCK_DB_DATA/library-items/form-controls/_form-controls.data';
import { GlobalFootersData } from 'src/MOCK_DB_DATA/library-items/global-footers/_global-footers.data';
import { GlobalHeadersData } from 'src/MOCK_DB_DATA/library-items/global-headers/_global-headers.data';
import { HighchartsData } from 'src/MOCK_DB_DATA/library-items/highcharts/_highcharts.data';
import { ModalsData } from 'src/MOCK_DB_DATA/library-items/modals/_modals.data';
import { NavsData } from 'src/MOCK_DB_DATA/library-items/navs/_navs.data';
import { PaginationsData } from 'src/MOCK_DB_DATA/library-items/paginations/_paginations.data';
import { ProgressIndicatorsData } from 'src/MOCK_DB_DATA/library-items/progress-indicators/_progress-indicators.data';
import { SearchFieldsData } from 'src/MOCK_DB_DATA/library-items/searches/_searches.data';
import { TablesData } from 'src/MOCK_DB_DATA/library-items/tables/_tables.data';
import { TagsData } from 'src/MOCK_DB_DATA/library-items/tags/_tags.data';
import { ToastsData } from 'src/MOCK_DB_DATA/library-items/toasts/_toasts.data';
import { TooltipPopoverData } from 'src/MOCK_DB_DATA/library-items/tooltip-popover/_tooltip-popover.data';
import { TreeViewsData } from 'src/MOCK_DB_DATA/library-items/tree-views/_tree-views.data';

// Alle komponenter
const AllComponentsData: LibraryItem[] = [
  ...AccordionsData.libraryItems,
  ...AlertsData.libraryItems,
  ...BadgesData.libraryItems,
  ...BreadcrumbsData.libraryItems,
  ...ButtonsData.libraryItems,
  ...CardsData.libraryItems,
  ...FormControlsData.libraryItems,
  ...GlobalFootersData.libraryItems,
  ...GlobalHeadersData.libraryItems,
  ...HighchartsData.libraryItems,
  ...ModalsData.libraryItems,
  ...NavsData.libraryItems,
  ...PaginationsData.libraryItems,
  ...ProgressIndicatorsData.libraryItems,
  ...SearchFieldsData.libraryItems,
  ...TablesData.libraryItems,
  ...TagsData.libraryItems,
  ...ToastsData.libraryItems,
  ...TooltipPopoverData.libraryItems,
  ...TreeViewsData.libraryItems,
];

// Deprecated:

// Layout og sidemaler
// import { DrawersData } from 'src/MOCK_DB_DATA/library-items/drawers/_drawers.data';
// import { ErrorPagesData } from 'src/MOCK_DB_DATA/library-items/error-pages/_error-pages.data';
// import { LayoutTemplatesData } from 'src/MOCK_DB_DATA/library-items/layout-templates/_layout-templates.data';

// Eksempler på bruk
// import { PrototypeFormsData } from 'src/MOCK_DB_DATA/library-items/prototype-forms/_prototype-forms.data';
// import { PrototypeTablesData } from 'src/MOCK_DB_DATA/library-items/prototype-tables/_prototype-tables.data';

export function getMockDbBody(url: string): unknown {
  const urlSegment = url.slice(4);

  const dataMapping = {
    // Meta data
    LibraryItemsSharedData: LibraryItemsSharedData,
    LibraryItemGroupsSharedData: LibraryItemGroupsSharedData,

    // Visuell identitet
    ColorsData: ColorsData,
    IconsData: IconsData,
    TypographyData: TypographyData,

    // Komponenter
    AccordionsData: AccordionsData,
    AlertsData: AlertsData,
    BadgesData: BadgesData,
    BreadcrumbsData: BreadcrumbsData,
    ButtonsData: ButtonsData,
    CardsData: CardsData,
    FormControlsData: FormControlsData,
    GlobalFootersData: GlobalFootersData,
    GlobalHeadersData: GlobalHeadersData,
    HighchartsData: HighchartsData,
    ModalsData: ModalsData,
    NavsData: NavsData,
    PaginationsData: PaginationsData,
    ProgressIndicatorsData: ProgressIndicatorsData,
    SearchFieldsData: SearchFieldsData,
    TablesData: TablesData,
    TagsData: TagsData,
    ToastsData: ToastsData,
    TooltipPopoverData: TooltipPopoverData,
    TreeViewsData: TreeViewsData,

    // Alle komponenter
    AllComponentsData: AllComponentsData,
  };

  return dataMapping[urlSegment] || null;
}
