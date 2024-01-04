import { LibraryItem, LibraryItemGroup } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemGroupsSharedData as GROUPS } from '../library-item-groups-shared-data';

import { ToastsIntro } from './_toasts.intro';

import { Toast } from './toast';

export const Toasts: LibraryItem[] = [...Toast];

export const ToastsData: LibraryItemGroup = {
  id: GROUPS.Toasts.id,
  title: GROUPS.Toasts.title,
  intro: ToastsIntro,
  libraryItems: Toasts,
};
