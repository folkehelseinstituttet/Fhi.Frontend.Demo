import { PrototypeAngularTreeData } from './prototype-angular-tree/_prototype-angular-tree.data';
import { GlobalHeaderData } from './global-header/_global-header.data';
import { LayoutTemplatesData } from './layout-templates/_layout-templates.data';
import { PrototypeFormsData } from './prototype-forms/_prototype-forms.data';
import { PrototypePageheaderData } from './prototype-pageheader/_prototype-pageheader.data';
import { PrototypeTableWithExpandableContentData } from './prototype-table-with-expandable-content/_prototype-table-with-expandable-content.data';
import { TreeViewData } from './tree-view/_tree-view.data';

function stringTransform(objectNameAsString: string) {
  return objectNameAsString.slice(0, -4);
}

/*
 * LibraryItemSegmentPaths
 *  - corresponds to library second level menus
 */
export class LibraryItemSegmentPaths {
  // Modules
  static globalheader = stringTransform(Object.keys({ GlobalHeaderData })[0]);
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
