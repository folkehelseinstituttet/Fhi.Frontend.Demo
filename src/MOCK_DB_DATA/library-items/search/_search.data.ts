import { LibraryItem, LibraryItemGroup } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemGroupsSharedData as GROUPS } from '../library-item-groups-shared-data';

import { SearchIntro } from './_search.intro';

import { Search } from './search';

export const Searches: LibraryItem[] = [...Search];

export const SearchData: LibraryItemGroup = {
  id: GROUPS.Search.id,
  title: GROUPS.Search.title,
  intro: SearchIntro,
  libraryItems: Searches,
};
