import { LibraryItem, LibraryItemGroup } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemGroupsSharedData as GROUPS } from '../library-item-groups-shared-data';

import { ItemsIntro } from './_items.intro';

import { ItemOne } from './item-one';
import { ItemTwo } from './item-two';

const Items: LibraryItem[] = [
  ...ItemOne,
  ...ItemTwo
];

export const itemsData: LibraryItemGroup = {
  id: GROUPS.items.id,
  title: GROUPS.items.title,
  intro: ItemsIntro,
  libraryItems: Items
};
