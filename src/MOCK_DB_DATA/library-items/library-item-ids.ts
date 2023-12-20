import { DrawerIds } from './drawer/_drawer.ids';
import { GlobalFooterIds } from './global-footer/_global-footer.ids';
import { GlobalHeaderIds } from './global-header/_global-header.ids';
import { LayoutTemplatesIds } from './layout-templates/_layout-templates.ids';
import { PrototypeAngularTreeIds } from './prototype-angular-tree/_prototype-angular-tree.ids';
import { PrototypeFormsIds } from './prototype-forms/_prototype-forms.ids';
import { PrototypePageheaderIds } from './prototype-pageheader/_prototype-pageheader.ids';
import { PrototypeTableWithExpandableContentIds } from './prototype-table-with-expandable-content/_prototype-table-with-expandable-content.ids';
import { ToastIds } from './toast/_toast.ids';
import { TootipPopoverIds } from './tooltip-popover/_tooltip-popover.ids';
import { TreeViewIds } from './tree-view/_tree-view.ids';

const libraryItemIds = {
  ...PrototypeAngularTreeIds,
  ...DrawerIds,
  ...GlobalFooterIds,
  ...GlobalHeaderIds,
  ...LayoutTemplatesIds,
  ...PrototypeFormsIds,
  ...PrototypePageheaderIds,
  ...PrototypeTableWithExpandableContentIds,
  ...ToastIds,
  ...TootipPopoverIds,
  ...TreeViewIds,
};

export const LibraryItemIds = (() => {
  let n = 0;
  Object.keys(libraryItemIds).forEach((key) => {
    libraryItemIds[key] = 'library-item-' + ++n;
  });
  return libraryItemIds;
})();
