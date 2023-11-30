import { LibraryItem, LibraryItemGroup } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemGroupsSharedData as GROUPS } from '../library-item-groups-shared-data';

import { LayoutIntro } from './_layout.intro';

import { LayoutBase } from './layout-base';
import { LayoutExpandableFirstCol } from './layout-expandable-first-col';

export const Layouts: LibraryItem[] = [...LayoutBase, ...LayoutExpandableFirstCol];

export const LayoutsData: LibraryItemGroup = {
  id: GROUPS.Layouts.id,
  title: GROUPS.Layouts.title,
  intro: LayoutIntro,
  libraryItems: Layouts,
};
