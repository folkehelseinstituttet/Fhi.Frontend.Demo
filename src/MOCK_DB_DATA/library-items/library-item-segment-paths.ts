import { TreeViewBuilderData } from './tree-view-builder/_tree-view-builder.data';
import { LayoutTemplatesData } from './layout-templates/_layout-templates.data';

function stringTransform(objectNameAsString: string) {
  return objectNameAsString.slice(0, -4);
}

/*
 * LibraryItemSegmentPaths
 *  - corresponds to library second level menus
 */
export class LibraryItemSegmentPaths {
  // Layout and page templates
  static layoutandpagetemplates = stringTransform(Object.keys({ LayoutTemplatesData })[0]);

  // Prototypes (examples on use)
  static prototypeangulartreecomponent = stringTransform(Object.keys({ TreeViewBuilderData })[0]);
}
