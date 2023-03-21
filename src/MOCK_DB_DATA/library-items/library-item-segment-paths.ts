import { AccordionData } from './accordion/_accordion.data';
import { AdvancedSelectData } from './advanced-select/_advanced-select.data';
import { AlertsData } from './alerts/_alerts.data';
import { PrototypeAngularTreeData } from './prototype-angular-tree/_prototype-angular-tree.data';
import { BadgeData } from './badge/_badge.data';
import { BreadcrumbData } from './breadcrumb/_breadcrumb.data';
import { ButtonGroupData } from './button-group/_button-group.data';
import { ButtonsData } from './buttons/_buttons.data';
import { ColorData } from './color/_color.data';
import { DateAndTimeData } from './date-and-time/_date-and-time.data';
import { DatepickerData } from './datepicker/_datepicker.data';
import { DrawerData } from './drawer/_drawer.data';
import { HighchartsData } from './highcharts/_highcharts.data';
import { FormsData } from './forms/_forms.data';
import { GlobalFooterData } from './global-footer/_global-footer.data';
import { GlobalHeaderData } from './global-header/_global-header.data';
import { IconsData } from './icons/_icons.data';
import { LayoutTemplatesData } from './layout-templates/_layout-templates.data';
import { ModalData } from './modal/_modal.data';
import { NavigationtileData } from './navigation-tile/_navigation-tile.data';
import { PaginationData } from './pagination/_pagination.data';
import { PrototypeFormsData } from './prototype-forms/_prototype-forms.data';
import { PrototypePageheaderData } from './prototype-pageheader/_prototype-pageheader.data';
import { PrototypeTableWithExpandableContentData } from './prototype-table-with-expandable-content/_prototype-table-with-expandable-content.data';
import { SearchData } from './search/_search.data';
import { SpinnersData } from './spinners/_spinners.data';
import { TableData } from './table/_table.data';
import { TabsData } from './tabs/_tabs.data';
import { TagsData } from './tags/_tags.data';
import { ToastData } from './toast/_toast.data';
import { TooltipData } from './tooltip/_tooltip.data';
import { TreeViewData } from './tree-view/_tree-view.data';
import { TypographyData } from './typography/_typography.data';

function stringTransform(objectNameAsString: string) {
  return objectNameAsString.slice(0, -4);
}


/*
 * LibraryItemSegmentPaths
 *  - corresponds to library second level menus
 */
export class LibraryItemSegmentPaths {

  // Visual identity
  static color = stringTransform(Object.keys({ ColorData })[0]);
  static icons = stringTransform(Object.keys({ IconsData })[0]);
  static typography = stringTransform(Object.keys({ TypographyData })[0]);

  // Components
  static accordion = stringTransform(Object.keys({ AccordionData })[0]);
  static advancedSelect = stringTransform(Object.keys({ AdvancedSelectData })[0]);
  static alerts = stringTransform(Object.keys({ AlertsData })[0]);
  static badge = stringTransform(Object.keys({ BadgeData })[0]);
  static breadcrumb = stringTransform(Object.keys({ BreadcrumbData })[0]);
  static buttongroup = stringTransform(Object.keys({ ButtonGroupData })[0]);
  static buttons = stringTransform(Object.keys({ ButtonsData })[0]);
  static datepicker = stringTransform(Object.keys({ DatepickerData })[0]);
  static forms = stringTransform(Object.keys({ FormsData })[0]);
  static modal = stringTransform(Object.keys({ ModalData })[0]);
  static navigationtile = stringTransform(Object.keys({ NavigationtileData })[0]);
  static pagination = stringTransform(Object.keys({ PaginationData })[0]);
  static search = stringTransform(Object.keys({ SearchData })[0]);
  static spinners = stringTransform(Object.keys({ SpinnersData })[0]);
  static table = stringTransform(Object.keys({ TableData })[0]);
  static tabs = stringTransform(Object.keys({ TabsData })[0]);
  static tags = stringTransform(Object.keys({ TagsData })[0]);
  static toast = stringTransform(Object.keys({ ToastData })[0]);
  static tooltip = stringTransform(Object.keys({ TooltipData })[0]);

  // Modules
  static fhiAngularHighcharts = stringTransform(Object.keys({ HighchartsData })[0]);
  static globalfooter = stringTransform(Object.keys({ GlobalFooterData })[0]);
  static globalheader = stringTransform(Object.keys({ GlobalHeaderData })[0]);
  static dateandtimeselection = stringTransform(Object.keys({ DateAndTimeData })[0]);
  static drawer = stringTransform(Object.keys({ DrawerData })[0]);
  static treeview = stringTransform(Object.keys({ TreeViewData })[0]);

  // Layout and page templates
  static layoutandpagetemplates = stringTransform(Object.keys({ LayoutTemplatesData })[0]);

  // Prototypes (examples on use)
  static prototypeangulartreecomponent = stringTransform(Object.keys({ PrototypeAngularTreeData })[0]);
  static prototypeforms = stringTransform(Object.keys({ PrototypeFormsData })[0]);
  static prototypepageheader = stringTransform(Object.keys({ PrototypePageheaderData })[0]);
  static prototypetablewithexpandablecontent = stringTransform(Object.keys({ PrototypeTableWithExpandableContentData})[0]);

}
