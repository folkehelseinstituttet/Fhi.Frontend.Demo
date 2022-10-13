import { AccordionData } from 'src/MOCK_DB_DATA/library-items/accordion/_accordion.data';
import { AdvancedSelectData } from 'src/MOCK_DB_DATA/library-items/advanced-select/_advanced-select.data';
import { AlertsData } from 'src/MOCK_DB_DATA/library-items/alerts/_alerts.data';
import { BadgeData } from 'src/MOCK_DB_DATA/library-items/badge/_badge.data';
import { BreadcrumbData } from 'src/MOCK_DB_DATA/library-items/breadcrumb/_breadcrumb.data';
import { ButtonsData } from 'src/MOCK_DB_DATA/library-items/buttons/_buttons.data';
import { ColorData } from 'src/MOCK_DB_DATA/library-items/color/_color.data';
import { FormsData } from 'src/MOCK_DB_DATA/library-items/forms/_forms.data';
import { GlobalHeaderData } from 'src/MOCK_DB_DATA/library-items/global-header/_global-header.data';
import { IconsData } from 'src/MOCK_DB_DATA/library-items/icons/_icons.data';
import { ModalData } from 'src/MOCK_DB_DATA/library-items/modal/_modal.data';
import { NavigationtileData } from 'src/MOCK_DB_DATA/library-items/navigation-tile/_navigation-tile.data';
import { PaginationData } from 'src/MOCK_DB_DATA/library-items/pagination/_pagination.data';
import { SearchData } from 'src/MOCK_DB_DATA/library-items/search/_search.data';
import { TableData } from 'src/MOCK_DB_DATA/library-items/table/_table.data';
import { TabsData } from 'src/MOCK_DB_DATA/library-items/tabs/_tabs.data';
import { TagsData } from 'src/MOCK_DB_DATA/library-items/tags/_tags.data';
import { ToastData } from 'src/MOCK_DB_DATA/library-items/toast/_toast.data';
import { TooltipData } from 'src/MOCK_DB_DATA/library-items/tooltip/_tooltip.data';
import { TypographyData } from 'src/MOCK_DB_DATA/library-items/typography/_typography.data';

function stringTransform(objectNameAsString: string) {

  // TODO: is it necessary to have lover case... need better algorithm to chatch two words, eg. AdvancedSelect
  //       and a better algorithm to get it back to a valid mock db source.
  // return objectNameAsString.toLocaleLowerCase().slice(0, -4);

  return objectNameAsString.slice(0, -4);
}

export class SegmentPaths {

  /*
   * Main menu
   */
  static developer = 'developer';
  static designer = 'designer';


  /*
   * Library top level menu
   */

  static visualIdentity = 'visual-identity';
  static components = 'components';
  static modules = 'modules';


  /*
   * Library second level menus
   */

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
  static buttons = stringTransform(Object.keys({ ButtonsData })[0]);
  static forms = stringTransform(Object.keys({ FormsData })[0]);
  static modal = stringTransform(Object.keys({ ModalData })[0]);
  static navigationtile = stringTransform(Object.keys({ NavigationtileData })[0]);
  static pagination = stringTransform(Object.keys({ PaginationData })[0]);
  static search = stringTransform(Object.keys({ SearchData })[0]);
  static table = stringTransform(Object.keys({ TableData })[0]);
  static tabs = stringTransform(Object.keys({ TabsData })[0]);
  static tags = stringTransform(Object.keys({ TagsData })[0]);
  static toast = stringTransform(Object.keys({ ToastData })[0]);
  static tooltip = stringTransform(Object.keys({ TooltipData })[0]);

  // Modules
  static globalheader = stringTransform(Object.keys({ GlobalHeaderData })[0]);

}
