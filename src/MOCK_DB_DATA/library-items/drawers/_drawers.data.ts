import { LibraryItem, LibraryItemGroup } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemGroupsSharedData as GROUPS } from '../library-item-groups-shared-data';

import { DrawersIntro } from './_drawers.intro';

import { Drawer } from './drawer';

export const Drawers: LibraryItem[] = [...Drawer];

export const DrawersData: LibraryItemGroup = {
  id: GROUPS.Drawers.id,
  title: GROUPS.Drawers.title,
  intro: DrawersIntro,
  libraryItems: Drawers,
};
