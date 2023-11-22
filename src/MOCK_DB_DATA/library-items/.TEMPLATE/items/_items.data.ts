import { LibraryItem, LibraryItemGroup } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemGroupsSharedData as GROUPS } from '../library-item-groups-shared-data';
import { LibraryItemConstants } from '../library-item-constants';

import { ItemsIntro } from './_items.intro';

import { ItemOne } from './item-one';
import { ItemTwo } from './item-two';

const Items: LibraryItem[] = [...ItemOne, ...ItemTwo];

export const ItemsData: LibraryItemGroup = {
  id: GROUPS.Items.id,
  title: GROUPS.Items.title,
  titleLang: LibraryItemConstants.languageLocaleId_NO, // <- if norwegian only
  intro: ItemsIntro,
  libraryItems: Items,
};
