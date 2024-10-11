import { LibraryItem, LibraryItemGroup } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemGroupsSharedData as GROUPS } from '../library-item-groups-shared-data';

import { SearchFieldsIntro } from './_searches.intro';

import { Search } from './search';
import { SearchAutocomplete } from './search-autocomplete';

export const SearchFields: LibraryItem[] = [...Search, ...SearchAutocomplete];

export const SearchFieldsData: LibraryItemGroup = {
  id: GROUPS.SearchFields.id,
  title: GROUPS.SearchFields.title,
  intro: SearchFieldsIntro,
  libraryItems: SearchFields,
};
