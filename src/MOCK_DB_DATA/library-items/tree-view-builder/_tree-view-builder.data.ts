import { LibraryItem, LibraryItemGroup } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemGroupsSharedData as GROUPS } from '../library-item-groups-shared-data';

import { TreeViewBuilderIntro } from './_tree-view-builder.intro';

import { TreeViewBuilder } from './tree-view-builder';

export const TreeViewBuilders: LibraryItem[] = [...TreeViewBuilder];

export const TreeViewBuilderData: LibraryItemGroup = {
  id: GROUPS.TreeViewBuilder.id,
  title: GROUPS.TreeViewBuilder.title,
  intro: TreeViewBuilderIntro,
  libraryItems: TreeViewBuilders,
};
