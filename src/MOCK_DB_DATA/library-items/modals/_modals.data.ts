import { LibraryItem, LibraryItemGroup } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemGroupsSharedData as GROUPS } from '../library-item-groups-shared-data';

import { ModalsIntro } from './_modals.intro';

import { Modal } from './modal';

export const Modals: LibraryItem[] = [...Modal];

export const ModalsData: LibraryItemGroup = {
  id: GROUPS.Modals.id,
  title: GROUPS.Modals.title,
  intro: ModalsIntro,
  libraryItems: Modals,
};
