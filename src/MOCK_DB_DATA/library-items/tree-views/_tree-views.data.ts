import { LibraryItem, LibraryItemGroup } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemGroupsSharedData as GROUPS } from '../library-item-groups-shared-data';

import { TreeViewsIntro } from './_tree-views.intro';

import { TreeViewNavigation } from './tree-view-navigation';
import { TreeViewCheckbox } from './tree-view-checkbox';
import { TreeViewRadio } from './tree-view-radio';

export const TreeViews: LibraryItem[] = [
  ...TreeViewNavigation,
  ...TreeViewCheckbox,
  ...TreeViewRadio,
];

export const TreeViewsData: LibraryItemGroup = {
  id: GROUPS.TreeViews.id,
  title: GROUPS.TreeViews.title,
  intro: TreeViewsIntro,
  libraryItems: TreeViews,
};
