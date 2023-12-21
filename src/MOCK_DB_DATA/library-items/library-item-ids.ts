import { LayoutTemplatesIds } from './layout-templates/_layout-templates.ids';
import { PrototypeAngularTreeIds } from './prototype-angular-tree/_prototype-angular-tree.ids';
import { PrototypeFormsIds } from './prototype-forms/_prototype-forms.ids';
import { PrototypePageheaderIds } from './prototype-pageheader/_prototype-pageheader.ids';
import { PrototypeTableWithExpandableContentIds } from './prototype-table-with-expandable-content/_prototype-table-with-expandable-content.ids';
import { TreeViewIds } from './tree-view/_tree-view.ids';

const libraryItemIds = {
  ...PrototypeAngularTreeIds,
  ...LayoutTemplatesIds,
  ...PrototypeFormsIds,
  ...PrototypePageheaderIds,
  ...PrototypeTableWithExpandableContentIds,
  ...TreeViewIds,
};

export const LibraryItemIds = (() => {
  let n = 0;
  Object.keys(libraryItemIds).forEach((key) => {
    libraryItemIds[key] = 'library-item-' + ++n;
  });
  return libraryItemIds;
})();
