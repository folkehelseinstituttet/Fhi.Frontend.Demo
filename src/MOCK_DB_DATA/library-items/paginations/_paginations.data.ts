import { LibraryItem, LibraryItemGroup } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemGroupsSharedData as GROUPS } from '../library-item-groups-shared-data';

import { PaginationsIntro } from './_paginations.intro';

import { Pagination } from './pagination';
import { PaginationCollectionCounter } from './pagination-collection-counter';

export const Paginations: LibraryItem[] = [...Pagination, ...PaginationCollectionCounter];

export const PaginationsData: LibraryItemGroup = {
  id: GROUPS.Paginations.id,
  title: GROUPS.Paginations.title,
  intro: PaginationsIntro,
  libraryItems: Paginations,
};
