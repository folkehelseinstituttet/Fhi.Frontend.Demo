import { LayoutTemplatesIds } from './layout-templates/_layout-templates.ids';
import { PrototypeAngularTreeIds } from './prototype-angular-tree/_prototype-angular-tree.ids';
import { PrototypeTableWithExpandableContentIds } from './prototype-table-with-expandable-content/_prototype-table-with-expandable-content.ids';

const libraryItemIds = {
  ...PrototypeAngularTreeIds,
  ...LayoutTemplatesIds,
  ...PrototypeTableWithExpandableContentIds,
};

export const LibraryItemIds = (() => {
  let n = 0;
  Object.keys(libraryItemIds).forEach((key) => {
    libraryItemIds[key] = 'library-item-' + ++n;
  });
  return libraryItemIds;
})();
