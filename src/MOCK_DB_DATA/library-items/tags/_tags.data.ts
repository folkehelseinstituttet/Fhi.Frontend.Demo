import { LibraryItem } from 'src/app/views/shared/models/library-item.model';

import { TagCategory } from './tag-category';
import { TagState } from './tag-state';
import { TagFilterOption } from './tag-filter-option';
import { TagSingleSelection } from './tag-single-selection';
import { TagMultipleSelection } from './tag-multiple-selection';

export const TagsData: LibraryItem[] = [
  ...TagCategory,
  ...TagFilterOption,
  ...TagState,
  ...TagSingleSelection,
  ...TagMultipleSelection,
];
