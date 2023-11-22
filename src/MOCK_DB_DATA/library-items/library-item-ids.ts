import { CardIds } from './cards/_cards.ids';
import { ColorIds } from './color/_color.ids';
import { DrawerIds } from './drawer/_drawer.ids';
import { GlobalFooterIds } from './global-footer/_global-footer.ids';
import { GlobalHeaderIds } from './global-header/_global-header.ids';
import { IconsIds } from './icons/_icons.ids';
import { ModalIds } from './modal/_modal.ids';
import { PaginationIds } from './pagination/_pagination.ids';
import { PrototypeAngularTreeIds } from './prototype-angular-tree/_prototype-angular-tree.ids';
import { PrototypeFormsIds } from './prototype-forms/_prototype-forms.ids';
import { PrototypePageheaderIds } from './prototype-pageheader/_prototype-pageheader.ids';
import { PrototypeTableWithExpandableContentIds } from './prototype-table-with-expandable-content/_prototype-table-with-expandable-content.ids';
import { SearchIds } from './search/_search.ids';
import { ProgressIndicatorsIds } from './progress-indicators/_progress-indicators.ids';
import { TableIds } from './table/_table.ids';
import { TagsIds } from './tags/_tags.ids';
import { ToastIds } from './toast/_toast.ids';
import { TootipPopoverIds } from './tooltip-popover/_tooltip-popover.ids';
import { TreeViewIds } from './tree-view/_tree-view.ids';
import { TypographyIds } from './typography/_typography.ids';

const libraryItemIds = {
  ...PrototypeAngularTreeIds,
  ...CardIds,
  ...ColorIds,
  ...DrawerIds,
  ...GlobalFooterIds,
  ...GlobalHeaderIds,
  ...IconsIds,
  ...ModalIds,
  ...PaginationIds,
  ...PrototypeFormsIds,
  ...PrototypePageheaderIds,
  ...PrototypeTableWithExpandableContentIds,
  ...SearchIds,
  ...ProgressIndicatorsIds,
  ...TableIds,
  ...TagsIds,
  ...ToastIds,
  ...TootipPopoverIds,
  ...TreeViewIds,
  ...TypographyIds,
};

export const LibraryItemIds = (() => {
  let n = 0;
  Object.keys(libraryItemIds).forEach((key) => {
    libraryItemIds[key] = 'library-item-' + ++n;
  });
  return libraryItemIds;
})();
