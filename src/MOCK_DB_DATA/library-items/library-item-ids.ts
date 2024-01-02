import { LayoutTemplatesIds } from './layout-templates/_layout-templates.ids';

const libraryItemIds = {
  ...LayoutTemplatesIds,
};

export const LibraryItemIds = (() => {
  let n = 0;
  Object.keys(libraryItemIds).forEach((key) => {
    libraryItemIds[key] = 'library-item-' + ++n;
  });
  return libraryItemIds;
})();
