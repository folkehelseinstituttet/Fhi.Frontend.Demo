import { LibraryItem } from 'src/app/views/shared/models/library-item.model';

import { TagCategory } from './tag-category';
import { TagState } from './tag-state';
import { TagSingleSelection } from './tag-single-selection';
import { TagMultipleSelection } from './tag-multiple-selection';
import { TagStateDot } from './tag-state-dot';
import { TagFilterOption } from './tag-filter-option';

export const TagsData: LibraryItem[] = [
  ...TagCategory,
  ...TagFilterOption,
  ...TagMultipleSelection,
  ...TagSingleSelection,
  ...TagState,
  ...TagStateDot,
];
