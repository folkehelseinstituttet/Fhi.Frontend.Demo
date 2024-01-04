import { LibraryItem, LibraryItemGroup } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemGroupsSharedData as GROUPS } from '../library-item-groups-shared-data';

import { TagsIntro } from './_tags.intro';

import { Tag } from './tag';
import { TagState } from './tag-state';
import { TagSingleSelection } from './tag-single-selection';
import { TagMultipleSelection } from './tag-multiple-selection';
import { TagStateDot } from './tag-state-dot';
import { TagFilterOption } from './tag-filter-option';

export const Tags: LibraryItem[] = [
  ...Tag,
  ...TagFilterOption,
  ...TagMultipleSelection,
  ...TagSingleSelection,
  ...TagState,
  ...TagStateDot,
];

export const TagsData: LibraryItemGroup = {
  id: GROUPS.Tags.id,
  title: GROUPS.Tags.title,
  intro: TagsIntro,
  libraryItems: Tags,
};
