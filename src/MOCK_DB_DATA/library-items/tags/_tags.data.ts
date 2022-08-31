import { LibraryItem } from 'src/app/views/shared/library/models/library-item.model';

import { TagCategory } from './tag-category';
import { TagState } from './tag-state';
import { TagFilterOption } from './tag-filter-option';

export const TagsData: LibraryItem[] = [
  ...TagCategory,
  ...TagFilterOption,
  ...TagState
];


