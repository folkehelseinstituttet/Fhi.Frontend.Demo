import { PrototypeAngularTreeData } from './prototype-angular-tree/_prototype-angular-tree.data';
import { DrawerData } from './drawer/_drawer.data';
import { GlobalFooterData } from './global-footer/_global-footer.data';
import { GlobalHeaderData } from './global-header/_global-header.data';
import { LayoutTemplatesData } from './layout-templates/_layout-templates.data';
import { PrototypeFormsData } from './prototype-forms/_prototype-forms.data';
import { PrototypePageheaderData } from './prototype-pageheader/_prototype-pageheader.data';
import { PrototypeTableWithExpandableContentData } from './prototype-table-with-expandable-content/_prototype-table-with-expandable-content.data';
import { TagsData } from './tags/_tags.data';
import { ToastData } from './toast/_toast.data';
import { TootipPopoverData } from './tooltip-popover/_tooltip-popover.data';
import { TreeViewData } from './tree-view/_tree-view.data';

function stringTransform(objectNameAsString: string) {
  return objectNameAsString.slice(0, -4);
}

/*
 * LibraryItemSegmentPaths
 *  - corresponds to library second level menus
 */
export class LibraryItemSegmentPaths {
  // Components
  static tags = stringTransform(Object.keys({ TagsData })[0]);
  static toast = stringTransform(Object.keys({ ToastData })[0]);
  static tooltip = stringTransform(Object.keys({ TootipPopoverData })[0]);

  // Modules
  static globalfooter = stringTransform(Object.keys({ GlobalFooterData })[0]);
  static globalheader = stringTransform(Object.keys({ GlobalHeaderData })[0]);
  static drawer = stringTransform(Object.keys({ DrawerData })[0]);
  static treeview = stringTransform(Object.keys({ TreeViewData })[0]);

  // Layout and page templates
  static layoutandpagetemplates = stringTransform(Object.keys({ LayoutTemplatesData })[0]);

  // Prototypes (examples on use)
  static prototypeangulartreecomponent = stringTransform(
    Object.keys({ PrototypeAngularTreeData })[0],
  );
  static prototypeforms = stringTransform(Object.keys({ PrototypeFormsData })[0]);
  static prototypepageheader = stringTransform(Object.keys({ PrototypePageheaderData })[0]);
  static prototypetablewithexpandablecontent = stringTransform(
    Object.keys({ PrototypeTableWithExpandableContentData })[0],
  );
}
